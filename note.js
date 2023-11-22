// Blueprint of the note takng app
// array of object will be send through map in order to make a list of note data in a form of a table
export class Note{
    constructor(id,title,descr,cdate,importance){
        this.id = id;
        this.title = title;
        this.descr = descr;
        this.cdate = cdate;
        this.importance = importance;
    }
}