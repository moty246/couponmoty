'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { summarizeCompanyInfo } from "@/ai/flows/summarize-company-info";
import { Button } from "@/components/ui/button";

const CouponDashboard = () => {
  const locale = 'he-IL'; // Hebrew locale
  const [companySummary, setCompanySummary] = useState('');

  useEffect(() => {
    const getSummary = async () => {
      const summary = await summarizeCompanyInfo({ companyName: 'Example Company' });
      setCompanySummary(summary.summary);
    };
    getSummary();
  }, []);

  // Sample data for coupons by status
  const couponsByStatusData = [
    { name: 'פעיל', value: 150 },
    { name: 'לא פעיל', value: 50 },
    { name: 'ממתין לאישור', value: 30 },
  ];

  // Sample data for coupons by company
  const couponsByCompanyData = [
    { name: 'חברה א', value: 80 },
    { name: 'חברה ב', value: 60 },
    { name: 'חברה ג', value: 40 },
  ];

  return (
    <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>קופונים פעילים</CardTitle>
          <CardDescription>מספר הקופונים הפעילים כרגע</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">150</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>קופונים שפג תוקפם</CardTitle>
          <CardDescription>מספר הקופונים שפג תוקפם</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">50</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>תוקף בקרוב</CardTitle>
          <CardDescription>קופונים שתוקפם יפוג תוך 7 ימים</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">10</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>סכום פעיל כולל</CardTitle>
          <CardDescription>שווי כולל של קופונים פעילים</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat(locale, {
              style: 'currency',
              currency: 'ILS'
            }).format(15000)}
          </div>
        </CardContent>
      </Card>

      <Separator className="col-span-full" />

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>קופונים לפי סטטוס</CardTitle>
          <CardDescription>התפלגות הקופונים לפי סטטוסים שונים</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={couponsByStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="מספר קופונים" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>קופונים לפי חברה</CardTitle>
          <CardDescription>התפלגות קופונים לפי חברות שונות</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={couponsByCompanyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" name="מספר קופונים" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>סיכום מידע על חברה</CardTitle>
          <CardDescription>סיכום קצר על חברה</CardDescription>
        </CardHeader>
        <CardContent>
          <div>{companySummary}</div>
          <Button onClick={async () => {
            const summary = await summarizeCompanyInfo({ companyName: 'Example Company' });
            setCompanySummary(summary.summary);
          }}>רענן סיכום</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CouponDashboard;
