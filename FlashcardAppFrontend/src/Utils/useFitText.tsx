export const useFitText = (s:string):number => {
	if(s.length<20){
		return 26;
	} else if(s.length<40){
		return 24;
	} else if(s.length<60){
		return 22;
	} else if(s.length<80){
		return 20;
	} else if(s.length<100){
		return 19;
	} else if(s.length<120){
		return 18;
	} else if(s.length<140){
		return 17;
	}
	return 16;
};