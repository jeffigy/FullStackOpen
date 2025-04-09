import { Request, Response } from "express";
export const handleGetNotes = async (req: Request, res: Response) => {
  res.send("notes");
};
export const handleGetNote = async (req: Request, res: Response) => {};
export const handleCreateNote = async (req: Request, res: Response) => {};
export const handleUpdateNote = async (req: Request, res: Response) => {};
export const handleDeleteNote = async (req: Request, res: Response) => {};
