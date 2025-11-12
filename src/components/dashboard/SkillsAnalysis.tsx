import React, { useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Grid as MuiGrid,
  useTheme,
  Avatar,
  AvatarGroup,
  Tooltip,
} from '@mui/material';
import { Whatshot } from '@mui/icons-material';

const Grid = MuiGrid as any; // Temporary type assertion for MUI v7

interface Skill {
  name: string;
  count: number;
  companies: Array<{
    name: string;
    role: string;
  }>;
}

interface SkillsAnalysisProps {
  applications: Array<{
    status: string;
    skills: string[];
    companyName: string;
    jobTitle: string;
  }>;
}

export const SkillsAnalysis: React.FC<SkillsAnalysisProps> = ({ applications }) => {
  const theme = useTheme();

  const popularSkills = useMemo(() => {
    const skillsMap = new Map<string, Skill>();

    // Process accepted applications and count skills
    applications.forEach(app => {
      if (app.status.toLowerCase() === 'accepted') {
        app.skills.forEach(skill => {
          if (!skillsMap.has(skill)) {
            skillsMap.set(skill, {
              name: skill,
              count: 0,
              companies: []
            });
          }
          const skillData = skillsMap.get(skill)!;
          skillData.count++;
          skillData.companies.push({
            name: app.companyName,
            role: app.jobTitle
          });
        });
      }
    });

    // Convert to array and sort by count
    return Array.from(skillsMap.values())
      .sort((a, b) => b.count - a.count);
  }, [applications]);

  const getCompanyInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Paper elevation={2} sx={{ mb: 3 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Whatshot sx={{ color: 'warning.main' }} />
          Popular Skills in Accepted Applications
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Skills that helped candidates secure positions
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {popularSkills.map((skill) => (
            <Grid item xs={12} key={skill.name}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  p: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Chip
                  label={skill.name}
                  color="primary"
                  sx={{ minWidth: 120 }}
                />
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexGrow: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {skill.count} {skill.count === 1 ? 'match' : 'matches'}
                  </Typography>
                  <AvatarGroup max={5}>
                    {skill.companies.map((company, index) => (
                      <Tooltip
                        key={index}
                        title={`${company.name} - ${company.role}`}
                        arrow
                      >
                        <Avatar
                          sx={{
                            bgcolor: getRandomColor(company.name),
                            width: 32,
                            height: 32,
                            fontSize: '0.875rem',
                          }}
                        >
                          {getCompanyInitials(company.name)}
                        </Avatar>
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </Box>
              </Box>
            </Grid>
          ))}
          {popularSkills.length === 0 && (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 4 }}
              >
                No accepted applications found yet. Keep applying and tracking your progress!
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};