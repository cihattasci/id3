import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardInterface } from "../../types";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

const initialState = {
  cards: [] as CardInterface[],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<CardInterface[]>) => {
      state.cards = action.payload;
    },
    addCard: (state, action: PayloadAction<CardInterface>) => {
      state.cards.push(action.payload);
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card: CardInterface) => card.id !== action.payload
      );
    },
    likeCard: (
      state,
      action: PayloadAction<{ type: boolean; id: string; userId: string }>
    ) => {
      const card = state.cards.find(
        (card: CardInterface) => card.id === action.payload.id
      );
      if (card) {
        if (action.payload.type) {
          card.likeUsers.push(action.payload.userId);
        } else {
          card.likeUsers = card.likeUsers.filter(
            (userId: string) => userId !== action.payload.userId
          );
        }
      }
    },
    addComment: (
      state,
      action: PayloadAction<{
        id: string;
        commentId: string;
        userId: string;
        message: string;
        createdAt: FirebaseFirestoreTypes.Timestamp;
      }>
    ) => {
      const card = state.cards.find(
        (card: CardInterface) => card.id === action.payload.id
      );
      if (card) {
        card.comments.push({
          id: action.payload.commentId,
          message: action.payload.message,
          userId: action.payload.userId,
          createdAt: action.payload.createdAt,
        });
      }
    },
  },
});

export const { setCards, addCard, deleteCard, likeCard, addComment } =
  cardSlice.actions;

export default cardSlice.reducer;
