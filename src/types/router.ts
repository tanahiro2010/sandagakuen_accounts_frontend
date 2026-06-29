type AppRoute =
  | {
    type: "page";
    path?: string;
    index?: boolean;
    element: React.ReactElement;
  }
  | {
    type: "layout";
    path?: string;
    element: React.ReactElement;
    children: AppRoute[];
  }
  | {
    type: "group";
    path?: string;
    children: AppRoute[];
  };

export type { AppRoute }
