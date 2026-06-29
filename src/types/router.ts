type AppRoute =
  | (
    | {
      type: "page";
      index: true;
      path?: never;
      element: React.ReactElement;
    }
    | {
      type: "page";
      path: string;
      index?: false;
      element: React.ReactElement;
    }
  )
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
