# **App Name**: CouponHarbor

## Core Features:

- Dashboard Summary: Display a dashboard summarizing coupon statuses, including active, expired, and expiring soon.
- Advanced Filtering: Enable filtering of coupons by status, expiration date, company name, and category.
- Coupon Creation: Allow users to create new coupons with required fields (company name, coupon code, initial amount, expiration date) and optional fields (notes, category, tags).
- Coupon Editing: Provide a screen to edit existing coupons, update amounts, and toggle coupon activation status.
- AI-Powered Tagging: Suggest relevant tags and categories for new coupons based on the company name and coupon code, using a generative AI tool.

## Style Guidelines:

- Primary color: Soft teal (#4DB6AC) to convey trustworthiness.
- Secondary color: Light grey (#ECEFF1) for backgrounds and neutral elements.
- Accent: Coral (#FF8A65) to highlight important actions.
- Use cards to display coupons in a clear and organized manner.
- Employ simple and intuitive icons for coupon actions and status indicators.

## Original User Request:
תמיכה בדפדפנים
Chrome, Firefox, Safari, Edge בגרסאות האחרונות
תמיכה מלאה במכשירים ניידים ובטאבלטים
מבנה בסיס הנתונים
אוסף Coupons
coupons: {
  couponId: {
    companyName: string,       // שם החברה
    couponCode: string,        // קוד הקופון
    currentAmount: number,     // סכום לשימוש עדכני
    initialAmount: number,     // סכום התחלתי
    expirationDate: timestamp, // תאריך תפוגה
    isActive: boolean,         // האם הקופון פעיל
    createDate: timestamp,     // תאריך יצירה
    lastUpdated: timestamp,    // תאריך עדכון אחרון
    usageHistory: [            // היסטוריית שימוש (אופציונלי)
      {
        date: timestamp,
        amount: number,
        notes: string
      }
    ],
    notes: string,             // הערות (אופציונלי)
    category: string,          // קטגוריה (אופציונלי)
    tags: array,               // תגיות (אופציונלי)
  }
}



מסכים ופונקציונליות
1. מסך כניסה
התחברות עם אימייל וסיסמה
אפשרות לאיפוס סיסמה
אופציונלי: הרשמה למשתמשים חדשים (אם מדובר במערכת רבת משתמשים)
2. לוח מחוונים (Dashboard)
סיכום מצב כללי:
מספר קופונים פעילים
מספר קופונים שפג תוקפם
סכום כולל של קופונים פעילים
התראות על קופונים שעומדים לפוג בקרוב (תוך 7 ימים)
גרף המציג את התפלגות הקופונים לפי סטטוס
גרף המציג את התפלגות הקופונים לפי חברות
3. רשימת קופונים
טבלה עם עמודות: שם חברה, קוד קופון, סכום עדכני, תאריך תפוגה, סטטוס
סמנים ויזואליים (צבעים/איקונים) המציינים את הסטטוס:
ירוק: פעיל
אדום: פג תוקף
אפור: לא פעיל (מושבת)
צהוב: עומד לפוג בקרוב
כפתורי פעולה לכל קופון: עריכה, הפעלה/השבתה, מחיקה
פונקציונליות סינון:
לפי סטטוס (פעיל, לא פעיל, פג תוקף)
לפי תאריך תפוגה (טווח תאריכים)
לפי שם חברה
לפי קטגוריה (אם הוגדרה)
פונקציונליות מיון:
לפי תאריך תפוגה (עולה/יורד)
לפי סכום (עולה/יורד)
לפי שם חברה (א-ת/ת-א)
חיפוש חופשי בכל השדות
4. מסך יצירת קופון חדש
טופס עם השדות הבאים:
שם חברה (שדה חובה)
קוד קופון (שדה חובה)
סכום התחלתי (שדה חובה)
תאריך תפוגה (שדה חובה)
הערות (אופציונלי)
קטגוריה (אופציונלי)
תגיות (אופציונלי)
וולידציה בצד הלקוח לכל השדות
כפתור שמירה ויצירת קופון חדש
כפתור לשמירה והוספת קופון נוסף
5. מסך עריכת קופון
זהה למסך יצירת קופון, אך עם הנתונים של הקופון הקיים
היסטוריית שימוש (אם פונקציונליות זו מיושמת)
אפשרות לעדכון סכום נוכחי (הוספה או הפחתה)
אפשרות להפעלה/השבתה של הקופון
6. מסך פרטי קופון
הצגת כל פרטי הקופון
היסטוריית שימוש (אם פונקציונליות זו מיושמת)
כפתורים: עריכה, חזרה לרשימה, מחיקה
7. הגדרות (אופציונלי)
הגדרות התראות
ניהול קטגוריות
ניהול משתמשים (אם רלוונטי)
גיבוי ושחזור נתונים
עיצוב וחוויית משתמש (UX/UI)
כללי
תמיכה מלאה בעברית ובכיוון RTL (מימין לשמאל)
עיצוב נקי ומינימליסטי
צבעוניות עקבית ומותאמת למיתוג
Responsive Design עם נקודות שבירה מוגדרות היטב:
מובייל: עד 576px
טאבלט: 577px-992px
דסקטופ: מעל 993px
רכיבי UI
כרטיסים (Cards) להצגת מידע מרוכז
טבלאות עם אפשרויות סינון ומיון נוחות
טפסים עם וולידציה בזמן אמת
התראות ויזואליות (Toasts/Alerts)
דיאלוגים לאישור פעולות מחיקה/עדכון


פונקציונליות נוספת (אופציונלית)
ניהול שימוש בקופונים
רישום של כל שימוש בקופון (הפחתת סכום)
היסטוריית שימוש מפורטת
אפשרות לביטול פעולה אחרונה
התראות
התראות על קופונים שעומדים לפוג בקרוב
התראות דוא"ל (באמצעות Firebase Cloud Functions)
התראות Push (אם מדובר בפרוגרסיב ווב אפ)
דוחות
דוח שימוש תקופתי
דוח קופונים פעילים/לא פעילים
ייצוא דוחות ל-PDF או Excel
גיבוי ושחזור
ייצוא כל הנתונים לקובץ JSON
ייבוא נתונים מקובץ JSON
אבטחה
מנגנוני אבטחה
אימות משתמשים באמצעות Firebase Authentication
הרשאות גישה מוגדרות ב-Firestore Rules
הצפנת נתונים רגישים
ניהול הרשאות מבוסס תפקידים (אם יש מספר משתמשים)
שמירה על פרטיות
לא לאחסן מידע רגיש שאינו נחוץ
מחיקת נתונים לא נחוצים באופן תקופתי
עמידה בדרישות GDPR (אם רלוונטי)
  