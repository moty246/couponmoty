'use client';

import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {CalendarIcon} from 'lucide-react';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';
import {useRouter} from 'next/navigation';
import {toast} from "@/hooks/use-toast";

const FormSchema = z.object({
  companyName: z.string().min(2, {
    message: 'שם החברה חייב להיות לפחות 2 תווים.',
  }),
  couponCode: z.string().min(3, {
    message: 'קוד הקופון חייב להיות לפחות 3 תווים.',
  }),
  initialAmount: z.number({
    invalid_type_error: 'הסכום ההתחלתי חייב להיות מספר.',
  }).positive({
    message: 'הסכום ההתחלתי חייב להיות חיובי.',
  }),
  expiryDate: z.date({
    required_error: 'תאריך התפוגה הוא שדה חובה.',
  }),
  notes: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

interface Coupon {
  id: string;
  companyName: string;
  couponCode: string;
  amount: number;
  expiryDate: Date;
  status: 'active' | 'inactive' | 'expired' | 'expiringSoon';
  category?: string;
  notes?: string;
  tags?: string;
}

const EditCouponPage = ({params}: {params: {id: string}}) => {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Mock API call to fetch coupon by ID
    const fetchCoupon = async () => {
      // Replace this with your actual API call
      const mockCoupon: Coupon = {
        id: params.id,
        companyName: 'קפה גרג',
        couponCode: 'GREG50',
        amount: 50,
        expiryDate: new Date('2024-12-31'),
        status: 'active',
        category: 'אוכל',
        notes: 'הערות לדוגמא',
        tags: 'טג, דוגמא',
      };
      setCoupon(mockCoupon);
      setDate(mockCoupon.expiryDate);
    };

    fetchCoupon();
  }, [params.id]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: coupon
      ? {
          companyName: coupon.companyName,
          couponCode: coupon.couponCode,
          initialAmount: coupon.amount,
          expiryDate: coupon.expiryDate,
          notes: coupon.notes,
          category: coupon.category,
          tags: coupon.tags,
        }
      : {
          companyName: '',
          couponCode: '',
          initialAmount: undefined,
          expiryDate: undefined,
          notes: '',
          category: '',
          tags: '',
        },
    mode: 'onChange',
  });

  useEffect(() => {
    if (coupon) {
      form.reset({
        companyName: coupon.companyName,
        couponCode: coupon.couponCode,
        initialAmount: coupon.amount,
        expiryDate: coupon.expiryDate,
        notes: coupon.notes,
        category: coupon.category,
        tags: coupon.tags,
      });
    }
  }, [coupon, form]);

  function onSubmit(values: FormValues) {
    const expiryDate = date || values.expiryDate;
    if (!expiryDate) {
      toast({
        title: 'תאריך התפוגה הוא שדה חובה.',
        variant: 'destructive',
      });
      return;
    }
  
    const finalValues = {
      ...values,
      expiryDate: expiryDate,
    };

    console.log('Form values:', finalValues);

    toast({
      title: 'הקופון עודכן בהצלחה!',
    });

    // TODO: Implement update logic
  }

  if (!coupon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">עריכת קופון</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="companyName">שם חברה</Label>
          <Input id="companyName" type="text" {...form.register('companyName')} />
          {form.formState.errors.companyName && (
            <p className="text-red-500">{form.formState.errors.companyName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="couponCode">קוד קופון</Label>
          <Input id="couponCode" type="text" {...form.register('couponCode')} />
          {form.formState.errors.couponCode && (
            <p className="text-red-500">{form.formState.errors.couponCode.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="initialAmount">עדכן סכום</Label>
          <Input
            id="initialAmount"
            type="number"
            {...form.register('initialAmount', {valueAsNumber: true})}
          />
          {form.formState.errors.initialAmount && (
            <p className="text-red-500">{form.formState.errors.initialAmount.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="expiryDate">תאריך תפוגה</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                id="expiryDate"
                className={cn(
                  'w-[240px] justify-start text-left font-normal',
                  !date ? 'text-muted-foreground' : undefined
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'dd/MM/yyyy') : <span>בחר תאריך</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" side="bottom">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
          {form.formState.errors.expiryDate && (
            <p className="text-red-500">{form.formState.errors.expiryDate.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="notes">הערות</Label>
          <Textarea id="notes" {...form.register('notes')} />
        </div>
        <div>
          <Label htmlFor="category">קטגוריה</Label>
          <Input id="category" type="text" {...form.register('category')} />
        </div>
        <div>
          <Label htmlFor="tags">תגיות</Label>
          <Input id="tags" type="text" {...form.register('tags')} />
        </div>
        <div className="flex gap-2">
          <Button type="submit">שמירה</Button>
          <Button type="button" onClick={() => router.back()}>
            ביטול
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCouponPage;
