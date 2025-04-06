import React from 'react';
import './styles/student.css';
import Student from '../../models/Student';
import Performance from './Performance';
import EditIcon from '@mui/icons-material/Edit';
import FileUpload from '../../components/FileUpload';
import { uploadResume, getResume } from '../../api/api'

interface StudentProfileViewProps {
    isEditing: boolean;
    studentData: Student;
    onEditToggle: () => void;
    onSave: () => void;
    onDataChange: (data: Student) => void;
    resumeUrl?: string;
    setResumeUrl: (url: string) => void;
}

const StudentProfileView: React.FC<StudentProfileViewProps> = ({
    isEditing,
    studentData,
    onEditToggle,
    onSave,
    onDataChange,
    resumeUrl,
    setResumeUrl
}) => {
    const handleChange = (field: keyof Student, value: string | number) => {
        onDataChange({ ...studentData, [field]: value });
    };

    return (
        <div className="student-container">
            <div className="profile-card">
            <div className="profile-header">
                <h1 className="student-name">{`${studentData.firstName} ${studentData.lastName}`}</h1>
                {isEditing ? (
                    <>
                        <textarea
                            value={studentData.bio}
                            onChange={(e) => handleChange('bio', e.target.value)}
                            className="student-textarea"
                            maxLength={300}
                            style={{
                                width: '100%',
                                background: 'transparent',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '4px',
                                padding: '0.5rem'
                            }}
                        />
                        <div className="bio-counter" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {studentData.bio.length}/300 characters
                        </div>
                    </>
                ) : (
                    <p className="student-bio">{studentData.bio}</p>
                )}
              </div>

                <div className="info-block education-info">
                    <h2>Education</h2>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="info-label">School</span>
                            {isEditing ? (
                                <input
                                    value={studentData.school}
                                    onChange={(e) => handleChange('school', e.target.value)}
                                    className="student-input"
                                />
                            ) : (
                                <span className="info-value">{studentData.school}</span>
                            )}
                        </div>
                        <div className="info-item">
                          <span className="info-label">Graduation</span>
                          {isEditing ? (
                              <div className="graduation-inputs">
                                  <select
                                      value={studentData.gradSemester}
                                      onChange={(e) => handleChange('gradSemester', e.target.value)}
                                      className="student-input"
                                  >
                                      <option value="Spring">Spring</option>
                                      <option value="Fall">Fall</option>
                                      <option value="Summer">Summer</option>
                                  </select>
                                  <input
                                      type="number"
                                      value={studentData.gradYear}
                                      onChange={(e) => handleChange('gradYear', parseInt(e.target.value) || 0)}
                                      className="student-input"
                                  />
                              </div>
                          ) : (
                                <span className="info-value">{`${studentData.gradSemester} ${studentData.gradYear}`}</span>
                          )}
                      </div>
                  </div>
              </div>

                <div className="info-block contact-info">
                    <h2>Contact Information</h2>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="info-label">Email</span>
                            {isEditing ? (
                                <input
                                    value={studentData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="student-input"
                                />
                            ) : (
                                <span className="info-value">{studentData.email}</span>
                            )}
                        </div>
                    </div>
                </div>

                {(
                    <div className="info-block resume-viewer">
                        <h2>Resume</h2>
                        {isEditing && (
                            <FileUpload 
                                id="resume-upload"
                                text={resumeUrl ? "Update Resume" : "Upload Resume"}
                                onUpload={async (file) => {
                                    const response = await uploadResume(file, studentData.uid);
                                    if (response.data) {
                                        const resumeResponse = await getResume(studentData.uid);
                                        if (resumeResponse.data) {
                                            setResumeUrl(resumeResponse.data.Path);
                                        }
                                    }
                                }}
                            />
                        )}
                        {(
                            <iframe
                                title="resume-preview"
                                src={`${'http://localhost:5001'}${resumeUrl}`}
                                // src='http://localhost:5001/api/resumes/resume-fb9b68d7-193b-4a1c-bb91-fb326eeeab98.pdf'
                                className="resume-iframe"
                            />
                        )}
                    </div>
                )}
                    
                <button 
                  onClick={isEditing ? onSave : onEditToggle}
                  className="student-button"
                  style={{
                      backgroundColor: '#0066cc',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                  }}
                >
                    {isEditing ? (
                        <>Save Changes</>
                    ) : (
                        <>
                            <EditIcon style={{ fontSize: '18px' }} />
                            Edit Profile
                        </>
                    )}
                </button>
            </div>

            <div className="right-space">
                <Performance 
                    score={studentData.jobPerformance?.[0] || 0}
                    comment={studentData.jobPerformance?.[1] || "No reviews yet"}
                />
            </div>
        </div>
    );
};

export default StudentProfileView;