# Introduction
The Grep application is developed in Java to imitate the grep command in Linux. The app searches files and stores all lines matching the provided regular expression into a file. It begins at the specified root directory and recursively searches through all directories and files. It is developed using IntelliJ IDE, Core Java and Maven and deployed using Docker.      

# Quick Start
The application accepts three arguments: `regex` `rootPath` `outFile`
- `regex`: regular expression to match
- `rootPath`: root directory path to search
- `outFile`: output file path

Begin from root project directory.

1. Jar file
```
# compile and package Java code
mvn clean package

# run
java -cp target/grep-1.0-SNAPSHOT.jar ca.jrvs.apps.grep.JavaGrepImp .*Romeo.*Juliet.* ./data ./out/grep.txt
```
2. Docker
```
# get docker image
docker pull jlin811/grep

# run
docker run --rm -v `pwd`/data:/data -v `pwd`/log:/log jlin811/grep .*Romeo.*Juliet.* /data /log/grep.out
```

# Implementation
The application was implemented in IntelliJ IDE using Core Java which utilized libraries and functionalities such as Collections, Stream API and Lambda expressions. The SLF4J package was used for logging. Maven was used to build the app and manage the dependencies.
## Pseudocode
The `process` method is the main driver of the grep app.
```
matchedLines = []
for file in listFilesRecursively(rootDir)
    for line in readLines(file)
        if containsPattern(line)
            matchedLines.add(line)
writeToFile(matchedLines)
```

## Performance Issue

Running the application may yield an OutOfMemoryError exception. This happens when the JVM runs out of heap memory to further execute the app. This application may have this error when reading from large data files. There are a few possible solutions to help with this.
- ##### Increase Heap Memory 
    When running the application, the min/initial and max heap memory size can be set for the JVM. It can be set by passing additional options when running the application.     
    - `-Xms` for min/initial heap size
    - `-Xmx` for max heap size
  ```  
  # Sets JVM initial heap size to 10MB and max heap size to 6GB
  java -Xms10m -Xmx6g
  ```
- ##### BufferedReader
    The BufferedReader class allows the program to read input from a file in small portions rather than all at once. This would reduce the chances of error since only portions of the data file are stored on the heap at once.
- ##### Stream APIs
    Stream API allows the program to apply multiple different intermediate operations on the data until finally a terminal operation. Streams are lazy meaning intermediate operations are only applied after a terminal operation. Together with BufferedReader, data is read from a file after a terminal stream operation. This allows for data to be processed one at a time which would reduce the heap memory usage.

# Test
The application was tested manually using the following procedure:
1. Create text files placed within a directory.
2. Run the Grep app using IntelliJ with desired arguments
3. Compare output with expected results


Test Cases:
- Number of arguments not equal to 3
- Different regex, rootPath, outFile 
- Modify text files
- Change heap size

# Deployment
The application was dockerized using Docker and published on Docker Hub for easier distribution. The Docker image can be obtained by running `docker pull jlin811/grep` on the command line. Source code is managed by GitHub.   

Dockerfile used for building Docker image:
```
FROM openjdk:8-alpine
COPY target/grep*.jar /usr/local/app/grep/lib/grep.jar
ENTRYPOINT ["java","-jar","/usr/local/app/grep/lib/grep.jar"]
```

# Improvement
- Optimize by updating methods to return a `Stream` rather than `Collections`
- Provide information(path, file, line number) about the matched line in outFile
- Implement more Linux grep command functionalities