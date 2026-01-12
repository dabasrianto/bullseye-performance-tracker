import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

export interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  divisions: string[];
  participants: string[];
  created_by?: string;
}

export interface ScoreSession {
  id: string;
  userId: string;
  date: string;
  arrows: number[];
  totalScore: number;
  xCount: number;
  division: string;
  distance: string;
  notes?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  division?: string;
  club?: string;
  created_at: string;
}

export interface AnalyticsData {
  totalSessions: number;
  averageScore: number;
  totalXCount: number;
  bestScore: number;
  progressData: Array<{ date: string; score: number }>;
  scoreDistribution: Array<{ range: string; count: number }>;
}

interface DataContextType {
  // Tournaments
  tournaments: Tournament[];
  addTournament: (tournament: Omit<Tournament, 'id'>) => Promise<void>;
  updateTournament: (id: string, tournament: Partial<Tournament>) => Promise<void>;
  deleteTournament: (id: string) => Promise<void>;
  
  // Score Sessions
  scoreSessions: ScoreSession[];
  addScoreSession: (session: Omit<ScoreSession, 'id'>) => Promise<void>;
  deleteScoreSession: (id: string) => Promise<void>;
  getUserSessions: (userId: string) => ScoreSession[];
  
  // Users (for admin)
  users: UserProfile[];
  addUser: (user: Omit<UserProfile, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  updateUser: (id: string, user: Partial<UserProfile>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  
  // Analytics
  getAnalytics: (userId: string) => AnalyticsData;
  getAllAnalytics: () => AnalyticsData;
  
  // Loading state
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [scoreSessions, setScoreSessions] = useState<ScoreSession[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load data from Supabase on mount
  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load tournaments
      const { data: tournamentsData, error: tournamentsError } = await supabase
        .from('tournaments')
        .select('*')
        .order('date', { ascending: true });

      if (tournamentsError) throw tournamentsError;
      
      const mappedTournaments: Tournament[] = (tournamentsData || []).map(t => ({
        id: t.id,
        name: t.name,
        date: t.date,
        location: t.location,
        status: t.status as 'upcoming' | 'ongoing' | 'completed',
        divisions: t.divisions || [],
        participants: t.participants || [],
        created_by: t.created_by || undefined
      }));
      setTournaments(mappedTournaments);

      // Load score sessions (user's own or all if admin)
      if (user) {
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('score_sessions')
          .select('*')
          .order('date', { ascending: false });

        if (sessionsError) throw sessionsError;
        
        const mappedSessions: ScoreSession[] = (sessionsData || []).map(s => ({
          id: s.id,
          userId: s.user_id,
          date: s.date,
          arrows: s.arrows || [],
          totalScore: s.total_score,
          xCount: s.x_count,
          division: s.division || '',
          distance: s.distance || '',
          notes: s.notes || undefined
        }));
        setScoreSessions(mappedSessions);
      }

      // Load profiles with roles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get roles for each user
      const profilesWithRoles: UserProfile[] = await Promise.all(
        (profilesData || []).map(async (p) => {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', p.user_id)
            .maybeSingle();
          
          return {
            id: p.id,
            user_id: p.user_id,
            name: p.name,
            email: p.email,
            role: (roleData?.role as 'admin' | 'user') || 'user',
            division: p.division || undefined,
            club: p.club || undefined,
            created_at: p.created_at
          };
        })
      );
      setUsers(profilesWithRoles);

    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data. Silakan refresh halaman.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Tournament methods
  const addTournament = async (tournament: Omit<Tournament, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .insert({
          name: tournament.name,
          date: tournament.date,
          location: tournament.location,
          status: tournament.status,
          divisions: tournament.divisions,
          participants: tournament.participants,
          created_by: user?.id
        })
        .select()
        .single();

      if (error) throw error;
      
      const newTournament: Tournament = {
        id: data.id,
        name: data.name,
        date: data.date,
        location: data.location,
        status: data.status as 'upcoming' | 'ongoing' | 'completed',
        divisions: data.divisions || [],
        participants: data.participants || [],
        created_by: data.created_by || undefined
      };
      
      setTournaments([...tournaments, newTournament]);
      toast({
        title: "Sukses",
        description: "Turnamen berhasil ditambahkan"
      });
    } catch (error) {
      console.error('Error adding tournament:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan turnamen",
        variant: "destructive"
      });
    }
  };

  const updateTournament = async (id: string, updatedTournament: Partial<Tournament>) => {
    try {
      const { error } = await supabase
        .from('tournaments')
        .update({
          name: updatedTournament.name,
          date: updatedTournament.date,
          location: updatedTournament.location,
          status: updatedTournament.status,
          divisions: updatedTournament.divisions,
          participants: updatedTournament.participants
        })
        .eq('id', id);

      if (error) throw error;
      
      setTournaments(tournaments.map(t => t.id === id ? { ...t, ...updatedTournament } : t));
      toast({
        title: "Sukses",
        description: "Turnamen berhasil diperbarui"
      });
    } catch (error) {
      console.error('Error updating tournament:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui turnamen",
        variant: "destructive"
      });
    }
  };

  const deleteTournament = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tournaments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setTournaments(tournaments.filter(t => t.id !== id));
      toast({
        title: "Sukses",
        description: "Turnamen berhasil dihapus"
      });
    } catch (error) {
      console.error('Error deleting tournament:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus turnamen",
        variant: "destructive"
      });
    }
  };

  // Score session methods
  const addScoreSession = async (session: Omit<ScoreSession, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('score_sessions')
        .insert({
          user_id: session.userId,
          date: session.date,
          arrows: session.arrows,
          total_score: session.totalScore,
          x_count: session.xCount,
          division: session.division,
          distance: session.distance,
          notes: session.notes
        })
        .select()
        .single();

      if (error) throw error;
      
      const newSession: ScoreSession = {
        id: data.id,
        userId: data.user_id,
        date: data.date,
        arrows: data.arrows || [],
        totalScore: data.total_score,
        xCount: data.x_count,
        division: data.division || '',
        distance: data.distance || '',
        notes: data.notes || undefined
      };
      
      setScoreSessions([newSession, ...scoreSessions]);
      toast({
        title: "Sukses",
        description: "Sesi skor berhasil disimpan"
      });
    } catch (error) {
      console.error('Error adding score session:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan sesi skor",
        variant: "destructive"
      });
    }
  };

  const deleteScoreSession = async (id: string) => {
    try {
      const { error } = await supabase
        .from('score_sessions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setScoreSessions(scoreSessions.filter(s => s.id !== id));
      toast({
        title: "Sukses",
        description: "Sesi skor berhasil dihapus"
      });
    } catch (error) {
      console.error('Error deleting score session:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus sesi skor",
        variant: "destructive"
      });
    }
  };

  const getUserSessions = (userId: string) => {
    return scoreSessions.filter(s => s.userId === userId);
  };

  // User methods (for admin)
  const addUser = async (userProfile: Omit<UserProfile, 'id' | 'user_id' | 'created_at'>) => {
    // Note: Users are created through authentication, not directly
    toast({
      title: "Info",
      description: "Pengguna harus mendaftar melalui halaman registrasi"
    });
  };

  const updateUser = async (id: string, updatedUser: Partial<UserProfile>) => {
    try {
      const userToUpdate = users.find(u => u.id === id);
      if (!userToUpdate) throw new Error('User not found');

      const { error } = await supabase
        .from('profiles')
        .update({
          name: updatedUser.name,
          division: updatedUser.division,
          club: updatedUser.club
        })
        .eq('id', id);

      if (error) throw error;
      
      setUsers(users.map(u => u.id === id ? { ...u, ...updatedUser } : u));
      toast({
        title: "Sukses",
        description: "Profil pengguna berhasil diperbarui"
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui profil pengguna",
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (id: string) => {
    // Note: Deleting users should be done through auth admin functions
    toast({
      title: "Info",
      description: "Penghapusan pengguna harus dilakukan melalui admin backend"
    });
  };

  // Analytics methods
  const getAnalytics = (userId: string): AnalyticsData => {
    const userSessions = getUserSessions(userId);
    
    if (userSessions.length === 0) {
      return {
        totalSessions: 0,
        averageScore: 0,
        totalXCount: 0,
        bestScore: 0,
        progressData: [],
        scoreDistribution: []
      };
    }

    const totalScore = userSessions.reduce((sum, s) => sum + s.totalScore, 0);
    const totalXCount = userSessions.reduce((sum, s) => sum + s.xCount, 0);
    const bestScore = Math.max(...userSessions.map(s => s.totalScore));
    
    const progressData = userSessions
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(s => ({
        date: new Date(s.date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' }),
        score: s.totalScore
      }));

    return {
      totalSessions: userSessions.length,
      averageScore: Math.round(totalScore / userSessions.length),
      totalXCount,
      bestScore,
      progressData,
      scoreDistribution: []
    };
  };

  const getAllAnalytics = (): AnalyticsData => {
    if (scoreSessions.length === 0) {
      return {
        totalSessions: 0,
        averageScore: 0,
        totalXCount: 0,
        bestScore: 0,
        progressData: [],
        scoreDistribution: []
      };
    }

    const totalScore = scoreSessions.reduce((sum, s) => sum + s.totalScore, 0);
    const totalXCount = scoreSessions.reduce((sum, s) => sum + s.xCount, 0);
    const bestScore = Math.max(...scoreSessions.map(s => s.totalScore));

    return {
      totalSessions: scoreSessions.length,
      averageScore: Math.round(totalScore / scoreSessions.length),
      totalXCount,
      bestScore,
      progressData: [],
      scoreDistribution: []
    };
  };

  return (
    <DataContext.Provider value={{
      tournaments,
      addTournament,
      updateTournament,
      deleteTournament,
      scoreSessions,
      addScoreSession,
      deleteScoreSession,
      getUserSessions,
      users,
      addUser,
      updateUser,
      deleteUser,
      getAnalytics,
      getAllAnalytics,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
