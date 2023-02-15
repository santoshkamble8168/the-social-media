import User from "../models/user.js";

export const getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)

        if(!user) return res.status(400).json({message: "User not found"})

        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({error: error})
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)

        if(!user) return res.status(400).json({message: "User not found"})

        const friends = await Promise.all(
            user.friends.map(id => user.findById(id))
        )

        const friendsList = friends.map(
            ({_id, firstName, lastName, email, occupation, locatin, picturePath}) => {
                return {_id, firstName, lastName, email, occupation, locatin, picturePath}
            }
        )
        res.status(200).json(friendsList)

    } catch (error) {
        res.status(404).json({error: error})
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if (user.friend.include(friendId)) {
            user.friends = user.friends.filter(id => id !== friendId)
            friend.friends = friend.friends.filter(id => id !== friendId)
        }else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map(id => user.findById(id))
        )

        const friendsList = friends.map(
            ({_id, firstName, lastName, email, occupation, locatin, picturePath}) => {
                return {_id, firstName, lastName, email, occupation, locatin, picturePath}
            }
        )
        res.status(200).json(friendsList)

    } catch (error) {
        res.status(404).json({error: error})
    }
}