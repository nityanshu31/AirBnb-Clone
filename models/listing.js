const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listeningSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: String,
    image: {
        url: String, 
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    category: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    booking : [{
        type: Schema.Types.ObjectId,
        ref: "Reserve",
    }],
});

listeningSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({reviews: {$in: listing.reviews}});
    }
})

const  Listing = mongoose.model("Listing", listeningSchema);
module.exports = Listing;