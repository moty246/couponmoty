'use client';

import {useState, useEffect} from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {cn} from "@/lib/utils"
import {format} from "date-fns"
import {CalendarIcon, CheckCircle, CircleX, Edit, Trash2, AlertTriangle} from "lucide-react";
import {useRouter} from 'next/navigation';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog"


interface Coupon {
  id: string;
  companyName: string;
  couponCode: string;
  amount: number;
  expiryDate: Date;
  status: 'active' | 'inactive' | 'expired' | 'expiringSoon';
  category?: string;
}

const statusLabels: {[key: Coupon['status']]: string} = {
  active: 'פעיל',
  inactive: 'לא פעיל',
  expired: 'פג תוקף',
  expiringSoon: 'עומד לפוג בקרוב',
};

const statusColors: {[key: Coupon['status']]: string} = {
  active: 'text-green-500',
  inactive: 'text-gray-500',
  expired: 'text-red-500',
  expiringSoon: 'text-yellow-500',
};

const statusIcons: {[key: Coupon['status']]: React.ReactNode} = {
  active: <CheckCircle className="w-4 h-4" />,
  inactive: <CircleX className="w-4 h-4" />,
  expired: <Trash2 className="w-4 h-4" />,
  expiringSoon: <AlertTriangle className="w-4 h-4" />,
};

const CouponsPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      companyName: 'קפה גרג',
      couponCode: 'GREG50',
      amount: 50,
      expiryDate: new Date('2024-12-31'),
      status: 'active',
      category: 'אוכל',
    },
    {
      id: '2',
      companyName: 'אדידס',
      couponCode: 'ADIDAS20',
      amount: 20,
      expiryDate: new Date('2024-07-15'),
      status: 'expiringSoon',
      category: 'אופנה',
    },
    {
      id: '3',
      companyName: 'H&M',
      couponCode: 'HM15',
      amount: 15,
      expiryDate: new Date('2024-06-30'),
      status: 'expired',
      category: 'אופנה',
    },
    {
      id: '4',
      companyName: 'FOX',
      couponCode: 'FOX30',
      amount: 30,
      expiryDate: new Date('2025-01-01'),
      status: 'inactive',
      category: 'אופנה',
    },
  ]);

  const [statusFilter, setStatusFilter] = useState<Coupon['status'] | 'all'>('all');
  const [dateRange, setDateRange] = useState<Date | undefined>([undefined, undefined]);
  const [companyNameFilter, setCompanyNameFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<keyof Coupon>('expiryDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
  const router = useRouter();

  useEffect(() => {
    let filtered = [...coupons];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(coupon => coupon.status === statusFilter);
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(coupon => {
        const expiryTime = coupon.expiryDate.getTime();
        return expiryTime >= dateRange[0].getTime() && expiryTime <= dateRange[1].getTime();
      });
    }

    if (companyNameFilter) {
      filtered = filtered.filter(coupon =>
        coupon.companyName.toLowerCase().includes(companyNameFilter.toLowerCase())
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(coupon =>
        coupon.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.couponCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.amount.toString().includes(searchQuery)
      );
    }

    // Sorting logic
    filtered.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      if (sortColumn === 'companyName') {
        return a.companyName.localeCompare(b.companyName) * order;
      } else if (sortColumn === 'amount') {
        return (a.amount - b.amount) * order;
      } else {
        return (a.expiryDate.getTime() - b.expiryDate.getTime()) * order;
      }
    });

    setFilteredCoupons(filtered);
  }, [coupons, statusFilter, dateRange, companyNameFilter, searchQuery, sortColumn, sortOrder]);

  const handleStatusChange = (e: any) => {
    setStatusFilter(e.target.value);
  };

  const handleCompanyNameChange = (e: any) => {
    setCompanyNameFilter(e.target.value);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (column: keyof Coupon) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons(prevCoupons => prevCoupons.filter(coupon => coupon.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">רשימת קופונים</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
            סטטוס:
          </label>
          <Select id="statusFilter" defaultValue="all" onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="בחר סטטוס" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">הכל</SelectItem>
              <SelectItem value="active">פעיל</SelectItem>
              <SelectItem value="inactive">לא פעיל</SelectItem>
              <SelectItem value="expired">פג תוקף</SelectItem>
              <SelectItem value="expiringSoon">עומד לפוג בקרוב</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
            תאריך תפוגה:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                id="dateRange"
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !dateRange ? "text-muted-foreground" : undefined
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange && dateRange[0] ? (
                  dateRange[1] ? (
                    `${format(dateRange[0], "dd/MM/yyyy")} - ${format(
                      dateRange[1],
                      "dd/MM/yyyy"
                    )}`
                  ) : (
                    format(dateRange[0], "dd/MM/yyyy")
                  )
                ) : (
                  <span>בחר טווח תאריכים</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" side="bottom">
              <Calendar
                mode="range"
                defaultMonth={dateRange && dateRange[0]}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label htmlFor="companyNameFilter" className="block text-sm font-medium text-gray-700">
            שם חברה:
          </label>
          <Input
            type="text"
            id="companyNameFilter"
            className="w-[200px]"
            value={companyNameFilter}
            onChange={handleCompanyNameChange}
          />
        </div>

        <div>
          <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">
            חיפוש חופשי:
          </label>
          <Input
            type="text"
            id="searchQuery"
            className="w-[200px]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Table>
        <TableCaption>רשימת קופונים זמינים</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSortChange('companyName')}>
              שם חברה
            </TableHead>
            <TableHead>קוד קופון</TableHead>
            <TableHead onClick={() => handleSortChange('amount')}>
              סכום שנשאר
            </TableHead>
            <TableHead onClick={() => handleSortChange('expiryDate')}>
              תאריך תפוגה
            </TableHead>
            <TableHead>סטטוס</TableHead>
            <TableHead>פעולות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCoupons.map(coupon => (
            <TableRow key={coupon.id}>
              <TableCell>{coupon.companyName}</TableCell>
              <TableCell>{coupon.couponCode}</TableCell>
              <TableCell>{coupon.amount}</TableCell>
              <TableCell>
                {format(coupon.expiryDate, "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={`${statusColors[coupon.status]} mr-2`}>
                    {statusIcons[coupon.status]}
                  </span>
                  {statusLabels[coupon.status]}
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => router.push(`/coupons/${coupon.id}`)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
                      <AlertDialogDescription>
                        פעולה זו תמחק את הקופון לצמיתות ולא ניתן יהיה לבטל אותה.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ביטול</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteCoupon(coupon.id)}>מחק</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponsPage;
