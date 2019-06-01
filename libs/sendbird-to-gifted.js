export default function sb2gifted(message) {
  return {
    _id: message.messageId,
    text: message.message,
    createdAt: new Date(message.createdAt),
    user: {
      _id: message.sender.userId,
      name: message.sender.nickname,
      avatar: message.sender.profileUrl,
    },
  };
}
