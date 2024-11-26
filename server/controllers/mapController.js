import mapModel from "../models/mapModel.js";

// add maps
const addMaps = async (req, res) => {
    const { place, mapId } = req.body;
    try {
        const exist = await mapModel.findOne({mapId})
        if (exist) {
            return res.json({ success: false, message: "Map already uploaded.." })
        }

        const cityExist = await mapModel.findOne({ place })
        if (cityExist) {
            return res.json({ success: false, message: "Map already uploaded.." })
        }
        const newMap = new mapModel({
            place: place,
            mapId: mapId,
        })

        await newMap.save();

        console.log(newMap);
        
        return res.json({ success: true, message: "Map successfully uploaded.." })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "map not uploaded" })
    }
}

// fetch maps from db
const fetchAllMaps = async (req, res) => {
    const { place } = req.query;
    try {
        const maps = await mapModel.find({place});
        if (maps.length === 0) {
            return res.json({ success: false, message: "Map not available.." });
        }
        res.json({ success: true, maps });
    } catch (err) {
        console.error('Error fetching maps:', err);
        res.status(500).json({ success: false, message: "Failed to fetch maps" });
    }
};



export { addMaps, fetchAllMaps }
