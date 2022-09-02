
import VideoItem from '../models/videoItem.js'
import 'dotenv/config'

const apiKey = process.env.YOUTUBE_API_KEY

export const getVideos = async (req, res) => {
    try {
        const videoItems = await VideoItem.find()
        res.status(200).json(videoItems)
    } catch (error) {
        res.status(404).json({ message: error.message })
        console.log('error inside server/controllers/vidoes.js (getVideos)')
    }

}

export const createVideo = async (req, res) => {
    const video = req.body
    const newVideo = new VideoItem(video)

    try {
        await newVideo.save()
        res.status(201).json(newVideo)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const getVideo = async (req, res) => {
    const { id } = req.params
    // const views = updateViews(id)
    try {
        const video = await VideoItem.find({ id })
        res.status(200).json(video)
    } catch (error) {
        res.staus(404).json({ message: error.message })
    }
}

export const updateVideoItem = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        if (body.mode === 'updateLikes') {

            try {
                console.log('like')
                await VideoItem.updateOne({ id: id }, { $inc: { likes: +1 } })
                await VideoItem.updateOne({ id: id }, { $push: { liked: body.userId } })
            } catch (error) {
                console.log(`error updating likes ${error}`)
            }

        }

        else if (body.mode === 'updateDislikes') {

            try {
                console.log('dislike')
                await VideoItem.updateOne({ id: id }, { $inc: { dislikes: +1 } })
                await VideoItem.updateOne({ id: id }, { $push: { disliked: body.userId } })
            } catch (error) {
                console.log(`error updating dislikes ${error}`)
            }
        }

        else if (body.mode === 'removeDislike') {

            try {
                console.log('remove dislike')
                // await VideoItem.updateMany({id: id}, {$inc: {dislikes: -1, likes: 1}}, {$pull: {disliked: body.uid}}, {push: {liked: body.uid}})
                await VideoItem.updateOne({ id: id }, { $inc: { dislikes: -1, likes: 1 } })
                await VideoItem.updateOne({ id: id }, { $pull: { disliked: body.userId } })
                await VideoItem.updateOne({ id: id }, { $push: { liked: body.userId } })

            } catch (error) {
                console.log('error removing dislike', error)
            }

        } else if (body.mode === 'removeLike') {
            try {
                await VideoItem.updateOne({ id: id }, { $inc: { likes: -1, dislikes: 1 } })
                await VideoItem.updateOne({ id: id }, { $pull: { liked: body.userId } })
                await VideoItem.updateOne({ id: id }, { $push: { disliked: body.userId } })
            } catch (error) {
                console.log('error removing like', error)
            }
        }

        else if (body.mode === 'updateViews') {
            try {
                await VideoItem.updateOne({ id: id }, { $set: { views: body.views } })
            } catch (error) {
                console.log(`error updating views ${error}`)
            }

        }
    } catch (error) {
        console.log(error)
    }
}

// const setViews = async (id) => {

// }

// export const updateViews = async (req, res) => {
//     try {
//         const { id } = req.params
//         const data = req.body
//         const views = data.views

//         pushChanges(id, views)
//     }
//     catch (error) {
//         console.log(error)
//     }
// }



// export const updateLikes = async (req, res) => {
//     try {
//         const { id } = req.params
//         const data = req.body
//         const likes = data.likes

//         await VideoItem.updateOne({ id: id }, { $set: { likes: likes } })
//         console.log(likes)
//         return
//     }
//     catch (error) {
//         console.log(error)
//     }
// }

// const pushChanges = async (id, views) => {
//     try {
//         await VideoItem.updateOne({ id: id }, { $set: { views: views } })
//         console.log(views)
//         return
//     }
//     catch (error) {
//         console.log(error)
//     }
// } 