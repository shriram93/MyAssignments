export class Note {
  id: number;
  title: string;
  text: string;
  state: string;
  constructor() {
    this.id = 0;
    this.title = '';
    this.text = '';
    this.state = '';
  }
}
const NoteStates = [
  'Not Started', 'Started', 'Completed'
];
export default NoteStates;
