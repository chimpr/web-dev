import React, { useState } from 'react';
import './styles/student.css';
import Student from '../../models/Student';
import Performance from './Performance';
import EditIcon from '@mui/icons-material/Edit';
import FileUpload from '../../components/FileUpload';
import { updateResume, getResume } from '../../api/api';
import { Button } from '@mui/material';

interface StudentProfileViewProps {
    recruiterView?: boolean,
    isEditing: boolean;
    studentData: Student;
    onEditToggle: () => void;
    onSave: () => void;
    onDataChange?: (data: Student) => void;
    resumeUrl?: string;
    setResumeUrl: React.Dispatch<React.SetStateAction<string>>;
    userId: string;
}

const StudentProfileView: React.FC<StudentProfileViewProps> = ({
    recruiterView,
    isEditing,
    studentData,
    onEditToggle,
    onSave,
    onDataChange,
    resumeUrl,
    setResumeUrl,
    userId 
}) => {
    const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (field: keyof Student, value: string | number) => {
        if (!recruiterView && onDataChange)
            onDataChange({ ...studentData, [field]: value });
    };

    const handleResumeUpload = async () => {
        if (!selectedResumeFile || !userId) return;
        
        try {
            setIsUploading(true);
            const response = await updateResume(selectedResumeFile, userId);
            
            console.log('Update response:', response); 
            
            if (response && response.resume) {
                setResumeUrl(`${response.resume.downloadUrl}?t=${Date.now()}`);
                setSelectedResumeFile(null);
            } else if (response?.Error) {
                console.error('Upload failed:', response.Error);
            }
        } catch (error) {
            console.error('Resume upload failed:', error);
        } finally {
            setIsUploading(false);
        }
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
                            <div className="resume-upload-section">
                                <FileUpload 
                                    id="resume-upload"
                                    text="Select New Resume"
                                    onUpload={(file) => setSelectedResumeFile(file)}
                                />
                                {selectedResumeFile && (
                                    <Button
                                        variant="contained"
                                        onClick={handleResumeUpload}
                                        disabled={isUploading}
                                        style={{
                                            backgroundColor: '#0066cc',
                                            color: 'white',
                                            marginLeft: '10px'
                                        }}
                                    >
                                        {isUploading ? 'Uploading...' : 'Save Resume'}
                                    </Button>
                                )}
                                {selectedResumeFile && (
                                    <p style={{ marginTop: '0.5rem' }}>
                                        Selected file: {selectedResumeFile.name}
                                    </p>
                                )}
                            </div>
                        )}
                        {resumeUrl && (
                            <iframe
                                title="resume-preview"
                                src={`${'http://localhost:5001'}${resumeUrl}`}
                                className="resume-iframe"
                                key={resumeUrl}
                            />
                        )}
                    </div>
                )}
                {
                    recruiterView ? 
                    <></>
                    :
                    <>
                        <button 
                        onClick={() => {
                            console.log('Save button clicked');
                            console.log('Current student data:', studentData);
                            isEditing ? onSave() : onEditToggle();
                        }}
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
                    </>
                }
            </div>

            {
                recruiterView ? 
                <></>
                :
                <div className="right-space">
                    <Performance 
                        score={studentData.jobPerformance?.[0] || 0}
                        comment={studentData.jobPerformance?.[1] || "No reviews yet"}
                    />
                </div>
            }
        </div>
    );
};

export default StudentProfileView;