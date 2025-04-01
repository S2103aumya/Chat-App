const Conversation= require("../Model/conversation.js");
const Message= require("../Model/message.js");


module.exports.sendMessage =async(req,res)=>{
try {
    const {message} = req.body;
    if (!message) {
        return res.status(400).json({ success: false, message: "Message field is required." });
      }
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);


    let chat = await Conversation.findOne({
        participants:{$all:[senderId , receiverId]}
    })

    if(!chat){
        chat = await Conversation.create({
            participants:[senderId , receiverId],
        })
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        message: message,
        conversationId: chat._id,
      });
  

    chat.messages.push(newMessage._id);
    await chat.save();

    res.status(201).json({ success: true, message: newMessage });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    console.log(`error in sendMessage ${error}`);
    }
}

module.exports.getMessage=async(req,res)=>{
    try {
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
    
        // const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

        const chats = await Conversation.findOne({
            participants:{$all:[senderId , receiverId]}
        }).populate("messages")
        
        if(!chats)  return res.status(200).send([]);
        const message = chats.messages;
        res.status(200).send(message)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(`error in getMessage ${error}`);
    }
}