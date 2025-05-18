
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ChevronLeft, Coffee } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Type definitions for coffee stories
interface CoffeeStory {
  id: string;
  title: string;
  author: string;
  cover: string;
  summary: string;
  chaptersCount: number;
  createdAt: Date;
}

interface Chapter {
  id: string;
  storyId: string;
  title: string;
  content: string;
  orderNumber: number;
}

const CoffeeEyes: React.FC = () => {
  const [stories, setStories] = useState<CoffeeStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<CoffeeStory | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const navigate = useNavigate();

  // Add CSS class to change theme when component mounts
  useEffect(() => {
    document.body.classList.add('coffee-theme');
    
    // Fetch stories from Firebase
    fetchStories();
    
    // Clean up when component unmounts
    return () => {
      document.body.classList.remove('coffee-theme');
    };
  }, []);

  // Fetch stories from Firebase
  const fetchStories = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'coffeeStories'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const storiesData: CoffeeStory[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        storiesData.push({
          id: doc.id,
          title: data.title,
          author: data.author,
          cover: data.cover,
          summary: data.summary,
          chaptersCount: data.chaptersCount,
          createdAt: data.createdAt?.toDate() || new Date(),
        });
      });
      
      setStories(storiesData);
    } catch (error) {
      console.error('Error fetching coffee stories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chapters for a story
  const fetchChapters = async (storyId: string) => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'coffeeChapters'),
        orderBy('orderNumber', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      const chaptersData: Chapter[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.storyId === storyId) {
          chaptersData.push({
            id: doc.id,
            storyId: data.storyId,
            title: data.title,
            content: data.content,
            orderNumber: data.orderNumber,
          });
        }
      });
      
      setChapters(chaptersData);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle story selection
  const handleStoryClick = (story: CoffeeStory) => {
    setSelectedStory(story);
    setSelectedChapter(null);
    fetchChapters(story.id);
  };

  // Handle chapter selection
  const handleChapterClick = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  // Handle back navigation
  const handleBack = () => {
    if (selectedChapter) {
      setSelectedChapter(null);
    } else if (selectedStory) {
      setSelectedStory(null);
    }
  };

  // Render story list
  const renderStoryList = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="coffee-card">
              <CardHeader>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[180px] w-full rounded-md" />
                <div className="mt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5 mt-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (stories.length === 0) {
      return (
        <div className="text-center py-12">
          <Coffee className="mx-auto w-12 h-12 text-coffee mb-4" />
          <h3 className="text-2xl font-bold text-coffee-dark">لا توجد روايات حالياً</h3>
          <p className="text-coffee-muted mt-2">
            سيتم إضافة روايات وقصص قريباً
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card 
            key={story.id} 
            className="coffee-card hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <CardDescription>بقلم: {story.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[2/3] relative overflow-hidden rounded-md mb-4">
                <img 
                  src={story.cover || 'https://via.placeholder.com/300x450?text=غلاف+الكتاب'} 
                  alt={story.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="line-clamp-3 text-coffee-muted">{story.summary}</p>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <span className="text-sm text-coffee-muted">
                  {story.chaptersCount} فصول
                </span>
                <Button variant="ghost" className="text-coffee">
                  قراءة المزيد
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  // Render chapters list
  const renderChaptersList = () => {
    if (!selectedStory) return null;

    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="coffee-card">
              <CardHeader>
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="text-coffee mr-2"
          >
            <ChevronLeft className="h-4 w-4 ml-2" />
            عودة
          </Button>
          <h2 className="text-2xl font-bold text-coffee-dark">
            {selectedStory.title} - الفصول
          </h2>
        </div>

        {chapters.length === 0 ? (
          <div className="text-center py-12">
            <Book className="mx-auto w-12 h-12 text-coffee mb-4" />
            <h3 className="text-xl font-bold text-coffee-dark">
              لا توجد فصول متاحة حالياً
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((chapter) => (
              <Card 
                key={chapter.id} 
                className="coffee-card hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleChapterClick(chapter)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">
                    {chapter.title}
                  </CardTitle>
                  <CardDescription>
                    الفصل {chapter.orderNumber}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render chapter content
  const renderChapterContent = () => {
    if (!selectedChapter) return null;

    return (
      <div className="coffee-chapter-container">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="text-coffee mr-2"
          >
            <ChevronLeft className="h-4 w-4 ml-2" />
            عودة للفصول
          </Button>
          <h2 className="text-2xl font-bold text-coffee-dark">
            {selectedChapter.title}
          </h2>
        </div>

        <Card className="coffee-card p-8">
          <div 
            className="prose prose-lg max-w-none font-tajawal text-coffee-text leading-relaxed"
            dangerouslySetInnerHTML={{ __html: selectedChapter.content }}
          />
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 bg-coffee-bg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-coffee-dark">عيون القهوة</h1>
          <Button 
            variant="outline" 
            className="border-coffee text-coffee hover:bg-coffee/10"
            onClick={() => navigate('/')}
          >
            العودة للصفحة الرئيسية
          </Button>
        </div>

        {selectedChapter 
          ? renderChapterContent() 
          : selectedStory 
            ? renderChaptersList() 
            : renderStoryList()
        }
      </div>
    </div>
  );
};

export default CoffeeEyes;
