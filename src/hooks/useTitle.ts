import { useEffect } from "react";
import { getDocumentTitle } from "../utils/getDocumentTitle";

export const useTitle = (title?: string) =>
  useEffect(() => {
    document.title = getDocumentTitle(title);
  }, [title]);
