-- Create comments table
CREATE TABLE public.comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  comment text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view comments"
ON public.comments
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert comments"
ON public.comments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON public.comments
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.comments
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();