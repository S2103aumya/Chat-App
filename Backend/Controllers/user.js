const userRoute= require("../routes/user");
const User= require("../Model/userModels");
const Conversation= require("../Model/conversation.js");

module.exports.getUserBySearch= async(req,res)=>{
    try{
        const search= req.query.search || '';
        const current= req.user._id;
        const user= await User.find({
            $and:[
                {
                    $or:[
                        {username:{$regex:'.*'+search+'.*',$options:'i'}},
                        {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                    ]
                },{
                    _id:{$ne:current}
                }
            ]
        }).select('-password').select('email')

        res.status(200).send(user);
    } catch(err){
        res.status(500).send({
            sucess: false,
            message: err,
        })
        console.log(err);
    }
}

module.exports.getCurrentchatters= async(req,res)=>{
    try{
        const currentUserID = req.user._id;
        const currenTChatters = await Conversation.find({
            participants:currentUserID
        }).sort({
            updatedAt: -1
            });

            if(!currenTChatters || currenTChatters.length === 0)  return res.status(200).send([]);

            const partcipantsIDS = currenTChatters.reduce((ids,conversation)=>{
                const otherParticipents = conversation.participants.filter(id => id !== currentUserID);
                return [...ids , ...otherParticipents]
            },[])

            const otherParticipentsIDS = partcipantsIDS.filter(id => id.toString() !== currentUserID.toString());

            const user = await User.find({_id:{$in:otherParticipentsIDS}}).select("-password").select("-email");

            const users = otherParticipentsIDS.map(id => user.find(user => user._id.toString() === id.toString()));

            res.status(200).send(users)

    } catch(err){
        res.status(500).send({
            sucess:false,
            message:err,
        })
        console.log(err);
    }
}