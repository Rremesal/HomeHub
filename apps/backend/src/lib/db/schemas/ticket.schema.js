import { STATUSES } from "../../../constants";
import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  title: String,
  description: Text,
  priority: String,
  status: { type: String, default: STATUSES.todo },
}, 
{
  timestamps: true
});

const Ticket = mongoose.model("Ticket", ticketSchema);