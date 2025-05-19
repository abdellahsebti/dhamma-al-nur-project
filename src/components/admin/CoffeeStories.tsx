import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CoffeeStory, CoffeeStoryFormValues } from './types';
import { adminServices } from './services';

const storySchema = z.object({
  title: z.string().min(1, 'عنوان القصة مطلوب'),
  author: z.string().min(1, 'اسم الكاتب مطلوب'),
  summary: z.string().min(1, 'ملخص القصة مطلوب'),
  coverFile: z.any().optional(),
});

const CoffeeStories: React.FC = () => {
  const [stories, setStories] = useState<CoffeeStory[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<CoffeeStory | null>(null);
  const { toast } = useToast();

  const form = useForm<CoffeeStoryFormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: '',
      author: '',
      summary: '',
    },
  });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const data = await adminServices.coffee.getStories();
      setStories(data);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء جلب القصص',
        variant: 'destructive',
      });
    }
  };

  const handleAddStoryClick = () => {
    form.reset();
    setIsAddDialogOpen(true);
  };

  const handleEditStoryClick = (story: CoffeeStory) => {
    setSelectedStory(story);
    form.reset({
      title: story.title,
      author: story.author,
      summary: story.summary,
    });
    setIsEditDialogOpen(true);
  };

  const onSubmitStory = async (data: CoffeeStoryFormValues) => {
    try {
      if (selectedStory) {
        await adminServices.coffee.updateStory(selectedStory.id, data);
        toast({
          title: 'تم التحديث',
          description: 'تم تحديث القصة بنجاح',
        });
      } else {
        await adminServices.coffee.addStory(data);
        toast({
          title: 'تمت الإضافة',
          description: 'تمت إضافة القصة بنجاح',
        });
      }
      fetchStories();
      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      setSelectedStory(null);
    } catch (error) {
      console.error('Error submitting story:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء حفظ القصة',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه القصة؟')) {
      try {
        await adminServices.coffee.deleteStory(id);
        toast({
          title: 'تم الحذف',
          description: 'تم حذف القصة بنجاح',
        });
        fetchStories();
      } catch (error) {
        console.error('Error deleting story:', error);
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء حذف القصة',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">قصص القهوة</h2>
        <Button onClick={handleAddStoryClick}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة قصة
        </Button>
      </div>

      <div className="grid gap-4">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{story.title}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditStoryClick(story)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteStory(story.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                الكاتب: {story.author}
              </p>
              <p className="mb-2">{story.summary}</p>
              <p className="text-sm text-muted-foreground">
                عدد الفصول: {story.chaptersCount}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة قصة جديدة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitStory)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان القصة</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الكاتب</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملخص القصة</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">حفظ</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل القصة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitStory)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان القصة</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الكاتب</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملخص القصة</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">حفظ التغييرات</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoffeeStories; 