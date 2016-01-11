url = 'C1T4.xml'
f = open(url,'r')
doc = f.read()
a = str()
index = 0
for ch in doc:
    if(index==len(doc)-1):
        a=a+doc[index]
        break
    if((doc[index]=='\\')&(doc[index+1]=='n')):
       index+=1
    else:
        if ((doc[index-1]=='\\')&(doc[index]=='n')):
            index+=1
        else:
           a = a+doc[index]
           index+=1

f.close()



f2 = open(url,'w')

f2.write(a)

f2.close()

