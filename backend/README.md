# Monochrome Art Emporium Backend

This is the Express & Node.js backend for the Monochrome Art Emporium portfolio/e-commerce site, connecting to MongoDB Atlas (or local MongoDB) via Mongoose.

## Tech Stack

- **Runtime**: Node.js + Express
- **Database**: MongoDB Atlas via Mongoose
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **File Uploads**: Multer + Cloudinary
- **Email**: Nodemailer (SMTP)
- **Configuration**: dotenv

## Getting Started

### Prerequisites

- Node.js (v18+)
- Local MongoDB running OR a MongoDB Atlas cluster URI.

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the `backend` folder (you can copy `.env.example` as a starting point):
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_signing_secret
JWT_EXPIRES_IN=7d

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Nodemailer SMTP Config (Optional)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
ADMIN_EMAIL=studio@ravitej.art
```

*Note: If Cloudinary credentials are omitted, the server will fall back to using beautiful Mock placeholders from Picsum for artwork images so you can still create/edit artworks locally.*

### Running the App

- **Development Mode** (with nodemon reload):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

Upon the first startup, the database will automatically:
1. Create a default admin user: **username**: `ravitej` | **password**: `ravitej`.
2. Seed the 6 default artworks if the artworks collection is empty.

---

## API Documentation

### Auth — `/api/auth`

- `POST /api/auth/login`
  - Body: `{ username, password }`
  - Returns: `{ token, expiresIn }` (Expires in 7 days)
- `POST /api/auth/change-password` **[Protected]**
  - Body: `{ currentPassword, newPassword }`
  - Returns: `{ message: "Password updated" }`

### Artworks — `/api/artworks`

- `GET /api/artworks`
  - Query Params: `medium` ("charcoal"|"paintings"|"sketches"|"all"), `page` (default 1), `limit` (default 20)
  - Returns: `{ artworks: [...], total, page, limit }`
- `GET /api/artworks/:id`
  - Path Param `id`: Slug string (e.g. `silence-01`)
  - Returns: Artwork object
- `POST /api/artworks` **[Protected]**
  - Multipart Form Data: `title`, `medium`, `year`, `dimensions`, `price`, `description`, `image` (file)
  - Returns: Created artwork object (201 Created)
- `PUT /api/artworks/:id` **[Protected]**
  - Path Param `id`: Slug string
  - Multipart Form Data: Any subset of fields, plus optional new `image` (file)
  - Returns: Updated artwork object
- `DELETE /api/artworks/:id` **[Protected]**
  - Path Param `id`: Slug string
  - Returns: `{ message: "Deleted" }`

### Inquiries — `/api/inquiries`

- `POST /api/inquiries`
  - Body: `{ name, email, subject, message }`
  - Returns: `{ message: "Inquiry received" }`
- `GET /api/inquiries` **[Protected]**
  - Query Params: `read` (boolean filter, optional), `page`, `limit` (default 20)
  - Returns: `{ inquiries: [...], total, unreadCount }`
- `PATCH /api/inquiries/:id/read` **[Protected]**
  - Returns: Updated inquiry object (marked as read)
- `DELETE /api/inquiries/:id` **[Protected]**
  - Returns: `{ message: "Deleted" }`
