import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Video, VideoFormValues } from './types';
import { api } from '@/lib/api';

const videoSchema = z.object({
  title: z.string().min(1, 'عنوان الفيديو مطلوب'),
  description: z.string().min(1, 'وصف الفيديو مطلوب'),
  category: z.string().min(1, 'التصنيف مطلوب'),
  duration: z.string().min(1, 'مدة الفيديو مطلوبة'),
  videoUrl: z.string().min(1, 'رابط الفيديو مطلوب').url('الرجاء إدخال رابط صحيح'),
  thumbnailUrl: z.string().min(1, 'رابط الصورة المصغرة مطلوب').url('الرجاء إدخال رابط صحيح'),
  featured: z.boolean().default(false),
});

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { toast } = useToast();

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      duration: '',
      videoUrl: '',
      thumbnailUrl: '',
      featured: false,
    },
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await api.videos.get();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء جلب الفيديوهات',
        variant: 'destructive',
      });
    }
  };

  const handleAddVideoClick = () => {
    form.reset();
    setIsAddDialogOpen(true);
  };

  const handleEditVideoClick = (video: Video) => {
    setSelectedVideo(video);
    form.reset({
      title: video.title,
      description: video.description,
      category: video.category,
      duration: video.duration,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      featured: video.featured,
    });
    setIsEditDialogOpen(true);
  };

  const onSubmitVideo = async (data: VideoFormValues) => {
    try {
      if (selectedVideo) {
        await api.videos.update(selectedVideo.id, data);
        toast({
          title: 'تم التحديث',
          description: 'تم تحديث الفيديو بنجاح',
        });
      } else {
        await api.videos.add(data);
        toast({
          title: 'تمت الإضافة',
          description: 'تمت إضافة الفيديو بنجاح',
        });
      }
      fetchVideos();
      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      setSelectedVideo(null);
    } catch (error) {
      console.error('Error submitting video:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء حفظ الفيديو',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
      try {
        await api.videos.delete(id);
        toast({
          title: 'تم الحذف',
          description: 'تم حذف الفيديو بنجاح',
        });
        fetchVideos();
      } catch (error) {
        console.error('Error deleting video:', error);
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء حذف الفيديو',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">الفيديوهات</h2>
        <Button onClick={handleAddVideoClick}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة فيديو
        </Button>
      </div>

      <div className="grid gap-4">
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{video.title}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(video.videoUrl, '_blank')}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditVideoClick(video)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteVideo(video.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video mb-4">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                التصنيف: {video.category}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                المدة: {video.duration}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                المشاهدات: {video.views}
              </p>
              <p className="mb-2">{video.description}</p>
              {video.featured && (
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded">
                  مميز
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة فيديو جديد</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitVideo)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الفيديو</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الفيديو</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التصنيف</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر التصنيف" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="محاضرات">محاضرات</SelectItem>
                        <SelectItem value="دروس">دروس</SelectItem>
                        <SelectItem value="ندوات">ندوات</SelectItem>
                        <SelectItem value="حوارات">حوارات</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مدة الفيديو</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="مثال: 45:30" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط الفيديو</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط الصورة المصغرة</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>فيديو مميز</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        سيظهر هذا الفيديو في الصفحة الرئيسية
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
            <DialogTitle>تعديل الفيديو</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitVideo)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الفيديو</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الفيديو</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التصنيف</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر التصنيف" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="محاضرات">محاضرات</SelectItem>
                        <SelectItem value="دروس">دروس</SelectItem>
                        <SelectItem value="ندوات">ندوات</SelectItem>
                        <SelectItem value="حوارات">حوارات</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مدة الفيديو</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="مثال: 45:30" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط الفيديو</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط الصورة المصغرة</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>فيديو مميز</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        سيظهر هذا الفيديو في الصفحة الرئيسية
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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

export default Videos; 