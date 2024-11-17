// export interface SearchParams {
//     from?: string;
//     to?: string;
//   }

//   export interface NavItem {
//     label: string;
//     href: string;
//     icon?: React.ReactNode;  // Optional icon if needed
//     children?: NavItem[];    // Optional for nested navigation items
//   }


// export interface ActivityByDate {
//     date: string; // The date in a specific format, e.g., 'YYYY-MM-DD'
//     activityCount: number; // The number of activities on this date
//   }

//   export interface ActivityEntry {
//     id: string;                // Unique identifier for the activity
//     date: string;              // Date of the activity in 'YYYY-MM-DD' format
//     activityType: string;      // Type of activity (e.g., "running", "cycling")
//     duration?: number;         // Optional duration in minutes
//     description?: string;      // Optional description of the activity
//     userId?: string;           // Optional user ID if activities are user-specific
//     color: string;             // Color to represent the activity in the chart
//     name: string;              // Name of the activity type for display purposes
//   }

//   // src/types.ts

// export interface DateRange {
//     from: Date;  // Start date of the range
//     to: Date;    // End date of the range
//   }
  

// src/types.ts

export interface SearchParams {
    from?: string;
    to?: string;
  }
  
  export interface NavItem {
    label: string;
    href: string;
    icon?: React.ReactNode;  // Optional icon if needed
    children?: NavItem[];    // Optional for nested navigation items
  }
  
  export interface ActivityByDate {
    date: string;  // The date in a specific format, e.g., 'YYYY-MM-DD'
    count: number; // The number of activities on this date
  }
  
  export interface ActivityEntry {
    id?: string;
    date?: string;
    activityType?: string;
    duration?: number;
    description?: string;
    userId?: string;
    color: string;
    name: string;
    count?: number;
  }  
  
  export interface DateRange {
    from: Date;  // Start date of the range
    to: Date;    // End date of the range
  }
  
  