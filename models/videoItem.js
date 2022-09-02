import mongoose from 'mongoose'

const videoSchema = mongoose.Schema({
    url: String,
    id: String,
    title: String,
    channel: String,
    description: String,
    thumbnail: String,
    maxresthumbnail: String,
    views: Number,
    likes: {
        type: Number,
        default: 0

    },
    dislikes: {
        type: Number,
        default: 0
    },
    liked: [String],
    disliked: [String]
})

const VideoItem = mongoose.model('VideoItem', videoSchema)

export default VideoItem