import express from 'express'

import { getVideos, createVideo, getVideo, updateVideoItem } from '../controllers/videos.js'

const router = express.Router()

router.get('/', getVideos)
router.get('/:id', getVideo)
router.post('/', createVideo)
router.put('/:id', updateVideoItem)
// router.patch('/:id', updateViews)
// router.put('/:id', updateLikes)

export default router

// updateViews, updateLikes,