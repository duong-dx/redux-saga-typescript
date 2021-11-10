import { Message } from '../chatSlide';

const SortData = (messages: Message[]) => {
  if (messages) {
    const byData = messages.slice(0)
    byData.sort((a, b) => {
      return a.id - b.id
    });
    return byData
  }
  return [];
}

export default SortData