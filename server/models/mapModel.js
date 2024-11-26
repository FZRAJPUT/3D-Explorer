import mongoose from "mongoose";

const mapSchema = new mongoose.Schema({
    place: { type: String, required: true },
    mapId: { type: String, required: true },
})

const mapModel = mongoose.models.maps || mongoose.model("maps", mapSchema)

export default mapModel