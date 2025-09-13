import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export type ChatDocumentMessage = {
  id: number;
  message: string | null;
};

export const useChatDocumentMessages = (limit?: number) => {
  return useQuery(["chatDocumentMessages", limit], async () => {
    const { data } = await axios.get<{ data: ChatDocumentMessage[] }>(
      `${BASE_URL}/items/chat_document_messages?fields=id,message&sort=-date_created&filter[status][_eq]=shown` +
        (limit ? `&limit=${limit}` : "")
    );
    return data.data;
  });
};
