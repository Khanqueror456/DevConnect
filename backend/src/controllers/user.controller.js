import User from "../models/User.js";

export const sendConnectionRequest = async (req, res) => {

    try{

        const senderId = req.user._id;
        const { userId } = req.params;

        if (senderId.toString() === userId.toString())
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
};

export const acceptConnectionRequest = async (req, res) => {
    try {

        const currentUserId = req.user._id; // the one accepting
        const { userId } = req.params; // the one who sent request

        const currentUser = await User.findById(currentUserId);
        const senderUser = await User.findById(userId);

        if (!senderUser)
        {
            return res.status(404).json({ message : "User not found"});
        }

        // Check if request exists
        if (!currentUser.connectionRequests.includes(userId)) {
            return res.status(400).json({ message : "No connection request found"});
        }

        // Remove from requests
        currentUser.connectionRequests = currentUser.connectionRequests.filter(
            (id) => id.toString() !== userId.toString()
        );

        // Add to connections (both sides)
        currentUser.connections.push(userId);
        senderUser.connections.push(currentUserId);

        await currentUser.save();
        await senderUser.save();

        res.json({ message : "Connection request accepted"});


    } catch (error) {
        res.status(500).json({ message : error.message});
    }
};


export const rejectConnectionRequest = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const { userId } = req.params;

        const currentUser = await User.findById(currentUserId);

        if (!currentUser)
        {
            return res.status(404).json({ message : "User not found"});
        }

        // Check if request exists
        if (!currentUser.connectionRequests.includes(userId))
        {
            return res.status(400).json({ message : "No connection request found" });
        }

        // Remove request
        currentUser.connectionRequests = currentUser.connectionRequests.filter(
            (id) => id.toString() !== userId.toString()
        );

        await currentUser.save();

        res.json({ message : "Connection request rejected" });
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

export const getConnectionRequests = async (req, res) => {
    try {
        
        const user = await User.findById(req.user._id)
        .populate("connectionRequests", "name profilePic");

        res.json(user.connectionRequests);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};