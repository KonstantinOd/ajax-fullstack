import React, {useState} from 'react';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';

interface CustomToggleProps {
    eventKey: string;
    onChange: (isExpanded: boolean) => void;
}

const CustomToggle: React.FC<CustomToggleProps> = ({ eventKey, onChange}) => {
    const [isExpanded, setIsExpanded] = useState<Boolean>(false);
    
    const decoratedOnClick = useAccordionButton(eventKey, () => {
        setIsExpanded(!isExpanded);
        onChange(!isExpanded);
    });
  
    return (
       <div className="text-center">
            {
                isExpanded
                    ? <ChevronUp role="button" onClick={decoratedOnClick}/>
                    : <ChevronDown role="button" onClick={decoratedOnClick}/>
            }
        </div>
    );
}

export default CustomToggle