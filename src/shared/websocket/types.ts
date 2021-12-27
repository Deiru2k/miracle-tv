export type ChatJoinData = {
  channel: string;
  token: string;
};

export type ChatMessageData = {
  token: string;
  message: string;
  channel: string;
};

export type ChatLeaveData = {
  token: string;
  channel: string;
};

export type ChatResponseType = {
  type: "message" | "error" | "join";
  username?: string;
  data?: string;
  timestamp: number;
};
