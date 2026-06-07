import Artwork from "../models/Artwork.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../middleware/upload.js";

// Validate artwork input
const validateArtworkData = (data, isUpdate = false) => {
  const errors = {};
  
  if (!isUpdate || data.title !== undefined) {
    const title = String(data.title ?? "").trim();
    if (!title) errors.title = "Title is required";
    else if (title.length > 120) errors.title = "Title cannot exceed 120 characters";
  }

  if (!isUpdate || data.medium !== undefined) {
    const allowed = ["charcoal", "paintings", "sketches"];
    if (!allowed.includes(data.medium)) {
      errors.medium = "Medium must be one of: charcoal, paintings, sketches";
    }
  }

  if (!isUpdate || data.year !== undefined) {
    const year = Number(data.year);
    if (isNaN(year) || year < 1900 || year > 2100) {
      errors.year = "Year must be between 1900 and 2100";
    }
  }

  if (!isUpdate || data.dimensions !== undefined) {
    const dimensions = String(data.dimensions ?? "").trim();
    if (!dimensions) errors.dimensions = "Dimensions are required";
    else if (dimensions.length > 60) errors.dimensions = "Dimensions cannot exceed 60 characters";
  }

  if (!isUpdate || data.price !== undefined) {
    const price = Number(data.price);
    if (isNaN(price) || price < 0) {
      errors.price = "Price must be a positive number";
    }
  }

  if (!isUpdate || data.description !== undefined) {
    const description = String(data.description ?? "").trim();
    if (!description) errors.description = "Description is required";
    else if (description.length > 800) errors.description = "Description cannot exceed 800 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const getArtworks = async (req, res) => {
  try {
    const { medium, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (medium && medium !== "all") {
      query.medium = medium;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Artwork.countDocuments(query);
    const artworks = await Artwork.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      artworks,
      total,
      page: pageNum,
      limit: limitNum,
    });
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return res.status(500).json({ message: "Error fetching artworks" });
  }
};

export const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params; // this is the slug ID (e.g. silence-01)
    const artwork = await Artwork.findOne({ id });
    
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    return res.status(200).json(artwork);
  } catch (error) {
    console.error("Error fetching artwork details:", error);
    return res.status(500).json({ message: "Error fetching artwork details" });
  }
};

export const createArtwork = async (req, res) => {
  try {
    const { title, medium, year, dimensions, price, description } = req.body;

    const validation = validateArtworkData({
      title,
      medium,
      year,
      dimensions,
      price,
      description,
    });

    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    if (!req.file) {
      return res.status(400).json({ errors: { image: "Image file is required" } });
    }

    // Upload image to Cloudinary
    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(req.file.buffer);
    } catch (uploadError) {
      return res.status(500).json({ message: "Error uploading image to Cloudinary" });
    }

    // Generate slug ID
    const generatedId = `${medium}-${Date.now()}`;

    const newArtwork = new Artwork({
      id: generatedId,
      title,
      medium,
      year: Number(year),
      dimensions,
      price: Number(price),
      image: uploadResult.url,
      imagePublicId: uploadResult.public_id,
      description,
    });

    await newArtwork.save();
    return res.status(201).json(newArtwork);
  } catch (error) {
    console.error("Error creating artwork:", error);
    return res.status(500).json({ message: "Error creating artwork" });
  }
};

export const updateArtwork = async (req, res) => {
  try {
    const { id } = req.params; // slug ID
    const { title, medium, year, dimensions, price, description } = req.body;

    const artwork = await Artwork.findOne({ id });
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    const validation = validateArtworkData(
      { title, medium, year, dimensions, price, description },
      true
    );

    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    // Prepare fields to update
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (medium !== undefined) updateFields.medium = medium;
    if (year !== undefined) updateFields.year = Number(year);
    if (dimensions !== undefined) updateFields.dimensions = dimensions;
    if (price !== undefined) updateFields.price = Number(price);
    if (description !== undefined) updateFields.description = description;

    // Handle new image file upload if provided
    if (req.file) {
      // 1. Upload new image
      let uploadResult;
      try {
        uploadResult = await uploadToCloudinary(req.file.buffer);
      } catch (uploadError) {
        return res.status(500).json({ message: "Error uploading image to Cloudinary" });
      }

      // 2. Delete old image
      if (artwork.imagePublicId) {
        try {
          await deleteFromCloudinary(artwork.imagePublicId);
        } catch (deleteError) {
          console.error("Failed to delete old image from Cloudinary:", deleteError);
        }
      }

      updateFields.image = uploadResult.url;
      updateFields.imagePublicId = uploadResult.public_id;
    }

    const updatedArtwork = await Artwork.findOneAndUpdate(
      { id },
      { $set: updateFields },
      { new: true }
    );

    return res.status(200).json(updatedArtwork);
  } catch (error) {
    console.error("Error updating artwork:", error);
    return res.status(500).json({ message: "Error updating artwork" });
  }
};

export const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params; // slug ID
    const artwork = await Artwork.findOne({ id });

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Delete image from Cloudinary
    if (artwork.imagePublicId) {
      try {
        await deleteFromCloudinary(artwork.imagePublicId);
      } catch (deleteError) {
        console.error("Failed to delete image from Cloudinary:", deleteError);
      }
    }

    await Artwork.deleteOne({ id });
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    return res.status(500).json({ message: "Error deleting artwork" });
  }
};
