import User, { Role } from "./User";

export default class Student extends User {
  public school: string;
  public gradSemester: string;
  public gradYear: number;
  public bio: string;
  public email: string;
  public jobPerformance: [number, string];

  constructor(
    uid: string,
    firstName: string,
    lastName: string,
    school: string,
    gradSemester: string,
    gradYear: number,
    bio: string,
    email: string,
    jobPerformance: [number, string] = [0, "No reviews yet"]
  ) {
    super(uid, "Student", firstName, lastName);
    this.school = school;
    this.gradSemester = gradSemester;
    this.gradYear = gradYear;
    this.bio = bio;
    this.email = email;
    this.jobPerformance = jobPerformance;
  }
}