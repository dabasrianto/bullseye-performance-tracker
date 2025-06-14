import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  divisions: string[];
  participants: string[];
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
  name: string;
  email: string;
  role: 'admin' | 'user';
  division?: string;
  club?: string;
  joinDate: string;
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
  addTournament: (tournament: Omit<Tournament, 'id'>) => void;
  updateTournament: (id: string, tournament: Partial<Tournament>) => void;
  deleteTournament: (id: string) => void;
  
  // Score Sessions
  scoreSessions: ScoreSession[];
  addScoreSession: (session: Omit<ScoreSession, 'id'>) => void;
  deleteScoreSession: (id: string) => void;
  getUserSessions: (userId: string) => ScoreSession[];
  
  // Users (for admin)
  users: UserProfile[];
  addUser: (user: Omit<UserProfile, 'id'>) => void;
  updateUser: (id: string, user: Partial<UserProfile>) => void;
  deleteUser: (id: string) => void;
  
  // Analytics
  getAnalytics: (userId: string) => AnalyticsData;
  getAllAnalytics: () => AnalyticsData;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial mock data
const initialTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Turnamen Regional 2025',
    date: '2025-06-15',
    location: 'Jakarta',
    status: 'upcoming',
    divisions: ['Recurve', 'Compound', 'Barebow'],
    participants: []
  },
  {
    id: '2',
    name: 'Kejuaraan Provinsi',
    date: '2025-07-22',
    location: 'Bandung',
    status: 'upcoming',
    divisions: ['Recurve', 'Compound'],
    participants: []
  }
];

const initialUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Admin ArcherScore',
    email: 'admin@archerscore.com',
    role: 'admin',
    joinDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Budi Santoso',
    email: 'budi@email.com',
    role: 'user',
    division: 'Recurve',
    club: 'Jakarta Archery Club',
    joinDate: '2024-03-15'
  },
  {
    id: '3',
    name: 'Siti Rahayu',
    email: 'siti@email.com',
    role: 'user',
    division: 'Compound',
    club: 'Bandung Archery',
    joinDate: '2024-02-20'
  }
];

const initialScoreSessions: ScoreSession[] = [
  {
    id: '1',
    userId: '2',
    date: '2024-12-01',
    arrows: [9, 8, 10, 9, 8, 7, 10, 9, 9, 8, 10, 9],
    totalScore: 106,
    xCount: 3,
    division: 'Recurve',
    distance: '70m',
    notes: 'Good session'
  },
  {
    id: '2',
    userId: '2',
    date: '2024-12-03',
    arrows: [10, 9, 9, 8, 9, 8, 10, 8, 9, 9, 10, 8],
    totalScore: 107,
    xCount: 3,
    division: 'Recurve',
    distance: '70m'
  }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [scoreSessions, setScoreSessions] = useState<ScoreSession[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const { toast } = useToast();

  // Load data from Firebase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load tournaments
        const tournamentsSnapshot = await getDocs(collection(db, 'tournaments'));
        const tournamentsData = tournamentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Tournament[];
        setTournaments(tournamentsData.length > 0 ? tournamentsData : initialTournaments);

        // Load score sessions
        const sessionsSnapshot = await getDocs(collection(db, 'scoreSessions'));
        const sessionsData = sessionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ScoreSession[];
        setScoreSessions(sessionsData.length > 0 ? sessionsData : initialScoreSessions);

        // Load users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserProfile[];
        setUsers(usersData.length > 0 ? usersData : initialUsers);

        // If no data exists, initialize with default data
        if (tournamentsData.length === 0) {
          for (const tournament of initialTournaments) {
            await addDoc(collection(db, 'tournaments'), tournament);
          }
        }
        if (sessionsData.length === 0) {
          for (const session of initialScoreSessions) {
            await addDoc(collection(db, 'scoreSessions'), session);
          }
        }
        if (usersData.length === 0) {
          for (const user of initialUsers) {
            await addDoc(collection(db, 'users'), user);
          }
        }
      } catch (error) {
        console.error('Error loading data from Firebase:', error);
        toast({
          title: "Error",
          description: "Failed to load data from Firebase. Using local data.",
          variant: "destructive"
        });
        // Fallback to localStorage
        const savedTournaments = localStorage.getItem('archerScore_tournaments');
        const savedSessions = localStorage.getItem('archerScore_sessions');
        const savedUsers = localStorage.getItem('archerScore_users');

        setTournaments(savedTournaments ? JSON.parse(savedTournaments) : initialTournaments);
        setScoreSessions(savedSessions ? JSON.parse(savedSessions) : initialScoreSessions);
        setUsers(savedUsers ? JSON.parse(savedUsers) : initialUsers);
      }
    };

    loadData();
  }, [toast]);

  // Tournament methods
  const addTournament = async (tournament: Omit<Tournament, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'tournaments'), tournament);
      const newTournament = { ...tournament, id: docRef.id };
      setTournaments([...tournaments, newTournament]);
      toast({
        title: "Success",
        description: "Tournament added successfully"
      });
    } catch (error) {
      console.error('Error adding tournament:', error);
      toast({
        title: "Error",
        description: "Failed to add tournament",
        variant: "destructive"
      });
    }
  };

  const updateTournament = async (id: string, updatedTournament: Partial<Tournament>) => {
    try {
      await updateDoc(doc(db, 'tournaments', id), updatedTournament);
      setTournaments(tournaments.map(t => t.id === id ? { ...t, ...updatedTournament } : t));
      toast({
        title: "Success",
        description: "Tournament updated successfully"
      });
    } catch (error) {
      console.error('Error updating tournament:', error);
      toast({
        title: "Error",
        description: "Failed to update tournament",
        variant: "destructive"
      });
    }
  };

  const deleteTournament = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tournaments', id));
      setTournaments(tournaments.filter(t => t.id !== id));
      toast({
        title: "Success",
        description: "Tournament deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting tournament:', error);
      toast({
        title: "Error",
        description: "Failed to delete tournament",
        variant: "destructive"
      });
    }
  };

  // Score session methods
  const addScoreSession = async (session: Omit<ScoreSession, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'scoreSessions'), session);
      const newSession = { ...session, id: docRef.id };
      setScoreSessions([...scoreSessions, newSession]);
      toast({
        title: "Success",
        description: "Score session saved successfully"
      });
    } catch (error) {
      console.error('Error adding score session:', error);
      toast({
        title: "Error",
        description: "Failed to save score session",
        variant: "destructive"
      });
    }
  };

  const deleteScoreSession = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'scoreSessions', id));
      setScoreSessions(scoreSessions.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Score session deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting score session:', error);
      toast({
        title: "Error",
        description: "Failed to delete score session",
        variant: "destructive"
      });
    }
  };

  const getUserSessions = (userId: string) => {
    return scoreSessions.filter(s => s.userId === userId);
  };

  // User methods
  const addUser = async (user: Omit<UserProfile, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), user);
      const newUser = { ...user, id: docRef.id };
      setUsers([...users, newUser]);
      toast({
        title: "Success",
        description: "User added successfully"
      });
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive"
      });
    }
  };

  const updateUser = async (id: string, updatedUser: Partial<UserProfile>) => {
    try {
      await updateDoc(doc(db, 'users', id), updatedUser);
      setUsers(users.map(u => u.id === id ? { ...u, ...updatedUser } : u));
      toast({
        title: "Success",
        description: "User updated successfully"
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      setUsers(users.filter(u => u.id !== id));
      toast({
        title: "Success",
        description: "User deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
    }
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
      getAllAnalytics
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