import User from "../models/User.js";

export const sendConnectionRequest = async (req, res) => {

    try{

        const senderId = req.user._id;
        const { userId } = req.params;

        if (senderId.toString() === userId)
        {
            return res.status(400).json({ message : "Cannot connect with yourself"});
        }

        const userToConnect = await User.findById(userId);

        if (!userToConnect){
            return res.status(404).json({ message : "User not found"});
        }

        // Already connected
        if (userToConnect.connections.includes(senderId)) {
            return res.status(400).json({ message : "Already connected"});
        }

        // Already requested
        if (userToConnect.connectionRequests.includes(senderId)) {
            return res.status(400).json({ message : "Request already sent"});
        }

        userToConnect.connectionRequests.push(senderId);

        await userToConnect.save();

        res.json({ message : "Connection request sent" });
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
}