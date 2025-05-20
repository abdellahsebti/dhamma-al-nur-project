import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Benefit, BenefitFormValues } from './types';
import { adminServices } from './services';

const benefitSchema = z.object({
  bookName: z.string().min(1, 'اسم الكتاب مطلوب'),
  volumeAndPage: z.string().min(1, 'الجزء والصفحة مطلوبان'),
  benefitText: z.string().min(1, 'نص الفائدة مطلوب'),
  scholarComment: z.string().optional(),
  category: z.string().min(1, 'التصنيف مطلوب'),
});

const sanitizeInput = (input: string) => {
  return input.replace(/[<>]/g, '');
};

const Benefits: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const { toast } = useToast();

  const form = useForm<BenefitFormValues>({
    resolver: zodResolver(benefitSchema),
    defaultValues: {
      bookName: '',
      volumeAndPage: '',
      benefitText: '',
      scholarComment: '',
      category: '',
    },
  });

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const data = await adminServices.benefits.get();
      setBenefits(data);
    } catch (error) {
      console.error('Error fetching benefits:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء جلب الفوائد',
        variant: 'destructive',
      });
    }
  };

  const handleAddBenefitClick = () => {
    form.reset();
    setIsAddDialogOpen(true);
  };

  const handleEditBenefitClick = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    form.reset({
      bookName: sanitizeInput(benefit.bookName),
      volumeAndPage: sanitizeInput(benefit.volumeAndPage),
      benefitText: sanitizeInput(benefit.benefitText),
      scholarComment: benefit.scholarComment ? sanitizeInput(benefit.scholarComment) : '',
      category: sanitizeInput(benefit.category),
    });
    setIsEditDialogOpen(true);
  };

  const onSubmitBenefit = async (data: BenefitFormValues) => {
    const sanitizedData = {
      ...data,
      bookName: sanitizeInput(data.bookName),
      volumeAndPage: sanitizeInput(data.volumeAndPage),
      benefitText: sanitizeInput(data.benefitText),
      scholarComment: data.scholarComment ? sanitizeInput(data.scholarComment) : '',
      category: sanitizeInput(data.category),
    };

    try {
      if (selectedBenefit) {
        await adminServices.benefits.update(selectedBenefit.id, sanitizedData);
        toast({
          title: 'تم التحديث',
          description: 'تم تحديث الفائدة بنجاح',
        });
      } else {
        await adminServices.benefits.add(sanitizedData);
        toast({
          title: 'تمت الإضافة',
          description: 'تمت إضافة الفائدة بنجاح',
        });
      }
      fetchBenefits();
      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      setSelectedBenefit(null);
    } catch (error) {
      console.error('Error submitting benefit:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء حفظ الفائدة',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteBenefit = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفائدة؟')) {
      try {
        await adminServices.benefits.delete(id);
        toast({
          title: 'تم الحذف',
          description: 'تم حذف الفائدة بنجاح',
        });
        fetchBenefits();
      } catch (error) {
        console.error('Error deleting benefit:', error);
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء حذف الفائدة',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">الفوائد العلمية</h2>
        <Button onClick={handleAddBenefitClick}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة فائدة
        </Button>
      </div>

      <div className="grid gap-4">
        {benefits.map((benefit) => (
          <Card key={benefit.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{sanitizeInput(benefit.bookName)}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditBenefitClick(benefit)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteBenefit(benefit.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {sanitizeInput(benefit.volumeAndPage)}
              </p>
              <p className="mb-2">{sanitizeInput(benefit.benefitText)}</p>
              {benefit.scholarComment && (
                <p className="text-sm text-muted-foreground">
                  تعليق الشيخ: {sanitizeInput(benefit.scholarComment)}
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                التصنيف: {sanitizeInput(benefit.category)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة فائدة جديدة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitBenefit)} className="space-y-4">
              <FormField
                control={form.control}
                name="bookName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الكتاب</FormLabel>
                    <FormControl>
                      <Input {...field} onChange={(e) => field.onChange(sanitizeInput(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volumeAndPage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الجزء والصفحة</FormLabel>
                    <FormControl>
                      <Input {...field} onChange={(e) => field.onChange(sanitizeInput(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="benefitText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نص الفائدة</FormLabel>
                    <FormControl>
                      <Textarea {...field} onChange={(e) => field.onChange(sanitizeInput(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scholarComment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعليق الشيخ (اختياري)</FormLabel>
                    <FormControl>
                      <Textarea {...field} onChange={(e) => field.onChange(sanitizeInput(e.target.value))} />
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
                    <Select onValueChange={(value) => field.onChange(sanitizeInput(value))} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر تصنيفاً" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="عقيدة">عقيدة</SelectItem>
                        <SelectItem value="فقه">فقه</SelectItem>
                        <SelectItem value="حديث">حديث</SelectItem>
                        <SelectItem value="محاضرات">محاضرات</SelectItem>
                        <SelectItem value="دروس">دروس</SelectItem>
                        <SelectItem value="علم">علم</SelectItem>
                      </SelectContent>
                    </Select>
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
            <DialogTitle>تعديل الفائدة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitBenefit)} className="space-y-4">
              <FormField
                control={form.control}
                name="bookName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الكتاب</FormLabel>
                    <FormControl>
                      <Input {...field} onChange={(e) => field.onChange(sanitizeInput(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volumeAndPage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الجزء والصفحة</FormLabel>
                    <FormControl>
                      <Input {...field} onChange={(e) => field.onChange(sanitizeInput(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="benefitText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نص الفائدة</FormLabel>
                    <FormControl>
                      <Textarea {...field} onChange={(e) => field.onChange(sanitizeInput(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scholarComment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعليق الشيخ (اختياري)</FormLabel>
                    <FormControl>
                      <Textarea {...field} onChange={(e) => field.onChange(sanitizeInput(e.target.value))} />
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
                    <Select onValueChange={(value) => field.onChange(sanitizeInput(value))} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر تصنيفاً" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="عقيدة">عقيدة</SelectItem>
                        <SelectItem value="فقه">فقه</SelectItem>
                        <SelectItem value="حديث">حديث</SelectItem>
                        <SelectItem value="محاضرات">محاضرات</SelectItem>
                        <SelectItem value="دروس">دروس</SelectItem>
                        <SelectItem value="علم">علم</SelectItem>
                      </SelectContent>
                    </Select>
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

export default Benefits; 