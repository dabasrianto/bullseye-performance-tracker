-- Create tournament registrations table
CREATE TABLE public.tournament_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  division TEXT,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'registered',
  UNIQUE (tournament_id, user_id)
);

-- Enable RLS
ALTER TABLE public.tournament_registrations ENABLE ROW LEVEL SECURITY;

-- Users can view all registrations for tournaments they participate in
CREATE POLICY "Users can view tournament registrations"
ON public.tournament_registrations
FOR SELECT
USING (true);

-- Users can register themselves
CREATE POLICY "Users can register for tournaments"
ON public.tournament_registrations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can cancel their own registration
CREATE POLICY "Users can cancel their registration"
ON public.tournament_registrations
FOR DELETE
USING (auth.uid() = user_id);

-- Admins can manage all registrations
CREATE POLICY "Admins can manage registrations"
ON public.tournament_registrations
FOR ALL
USING (has_role(auth.uid(), 'admin'));