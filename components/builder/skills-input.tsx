'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  getAllSkills, 
  getSkillsByCategory, 
  searchSkills, 
  getPopularSkills,
  getSkillsByRole,
  SKILL_CATEGORIES 
} from '@/lib/skills-data';

interface SkillsInputProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
  label?: string;
  placeholder?: string;
  jobRole?: string; // New prop for job role
}

export function SkillsInput({ 
  skills, 
  onSkillsChange, 
  label = "Skills", 
  placeholder = "Search and add skills...",
  jobRole = ""
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('role-based');
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Get role-based skills
  const roleBasedSkills = jobRole ? getSkillsByRole(jobRole) : getPopularSkills();

  // Get category-based suggestions
  const getCategorySuggestions = (category: string) => {
    if (category === 'popular') return getPopularSkills();
    if (category === 'role-based') return roleBasedSkills;
    if (category === 'all') return getAllSkills();
    return getSkillsByCategory(category);
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (value.trim()) {
      const filtered = searchSkills(value);
      setSuggestions(filtered.slice(0, 10));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Add skill
  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      onSkillsChange([...skills, skill]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Remove skill
  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addSkill(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && skills.length > 0) {
      removeSkill(skills[skills.length - 1]);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">{label}</label>
        <div className="relative mt-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="pl-10 pr-4"
            />
          </div>

          {/* Suggestions Panel */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addSkill(suggestion)}
                  className="w-full px-3 py-2 text-left hover:bg-muted focus:bg-muted focus:outline-none text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Skills Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="role-based" className="text-xs">
            {jobRole ? 'Job-Specific' : 'Popular'}
          </TabsTrigger>
          <TabsTrigger value="all" className="text-xs">All Skills</TabsTrigger>
          <TabsTrigger value="tech" className="text-xs">Tech</TabsTrigger>
          <TabsTrigger value="business" className="text-xs">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="role-based" className="mt-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {roleBasedSkills.slice(0, 12).map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                disabled={skills.includes(skill)}
                className={cn(
                  "text-xs px-2 py-1 rounded border text-left hover:bg-muted transition-colors",
                  skills.includes(skill)
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-background hover:border-primary"
                )}
              >
                {skill}
              </button>
            ))}
          </div>
          {roleBasedSkills.length > 12 && (
            <p className="text-xs text-muted-foreground mt-2">
              Showing 12 of {roleBasedSkills.length} skills. Use search to find more.
            </p>
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {getPopularSkills().slice(0, 15).map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                disabled={skills.includes(skill)}
                className={cn(
                  "text-xs px-2 py-1 rounded border text-left hover:bg-muted transition-colors",
                  skills.includes(skill)
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-background hover:border-primary"
                )}
              >
                {skill}
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tech" className="mt-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {getSkillsByCategory('Programming & Development').slice(0, 15).map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                disabled={skills.includes(skill)}
                className={cn(
                  "text-xs px-2 py-1 rounded border text-left hover:bg-muted transition-colors",
                  skills.includes(skill)
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-background hover:border-primary"
                )}
              >
                {skill}
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="business" className="mt-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {getSkillsByCategory('Business & Management').slice(0, 15).map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                disabled={skills.includes(skill)}
                className={cn(
                  "text-xs px-2 py-1 rounded border text-left hover:bg-muted transition-colors",
                  skills.includes(skill)
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-background hover:border-primary"
                )}
              >
                {skill}
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 