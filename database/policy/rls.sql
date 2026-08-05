-- Enable Row Level Security
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- ARTWORKS POLICIES

-- Allow public read access to artworks
CREATE POLICY "Public can view artworks" 
ON public.artworks 
FOR SELECT 
USING (true);

-- Allow authenticated users (admin) to insert artworks
CREATE POLICY "Admin can insert artworks" 
ON public.artworks 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update artworks
CREATE POLICY "Admin can update artworks" 
ON public.artworks 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete artworks
CREATE POLICY "Admin can delete artworks" 
ON public.artworks 
FOR DELETE 
USING (auth.role() = 'authenticated');


-- INQUIRIES POLICIES

-- Allow public to insert inquiries (contact form)
CREATE POLICY "Public can insert inquiries" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to read inquiries
CREATE POLICY "Admin can view inquiries" 
ON public.inquiries 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to update inquiries (mark read)
CREATE POLICY "Admin can update inquiries" 
ON public.inquiries 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete inquiries
CREATE POLICY "Admin can delete inquiries" 
ON public.inquiries 
FOR DELETE 
USING (auth.role() = 'authenticated');
