let memberOrder = [];

export const shuffleAndTellOrder = async () => {
    await renewMembers();
    shuffleMembers();
    return memberOrderToString();
}

const renewMembers = async () => {
  const memberArr = [];

  try {
    const members = await channel.guild.members.fetch();

    for (const [id, member] of members) {
      if (!member.user.bot) {
        const name = member.user.globalName ? member.user.globalName : member.user.username;
        memberArr.push(name);
      }
    }
    memberOrder = [...memberArr];
  } catch (error) {
    console.error(error);
  }
};

const shuffleMembers = () => {
  // Sattolo Shuffle
  const shuffledOrder = [...memberOrder];

  for (let i = shuffledOrder.length - 1; i >= 1; i--) {
    let roll = Math.floor(Math.random() * i);

    const temp = shuffledOrder[roll];
    shuffledOrder[roll] = shuffledOrder[i];
    shuffledOrder[i] = temp;
  }

  memberOrder = [...shuffledOrder];
};

const memberOrderToString = () => {
    const stringifiedOrder = [...memberOrder, memberOrder[0]];
    return stringifiedOrder.join(" > ");
};