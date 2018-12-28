function format(x,y,r,begin,total,color){
    let positionMap=[];
    for (let i = 0; i < total; i++) {
        positionMap[i]={
            x:x+Math.sin(begin+2*Math.PI/total*i)*r,
            y:y-Math.cos(begin+2*Math.PI/total*i)*r,
            color
        }
    }
    return positionMap;
}
