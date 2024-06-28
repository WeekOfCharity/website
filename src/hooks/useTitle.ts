import { useEffect } from "react";
import { getDocumentTitle } from "../utils/getDocumentTitle";

export const useTitle = (title?: string) =>
  useEffect(() => {
    const newTitle = getDocumentTitle(title);
    document.title = newTitle;

    return () => {
      setTimeout(() => {
        if (document.title === newTitle) document.title = getDocumentTitle();
      }, 500);
    };
  }, [title]);
