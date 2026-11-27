// export PATH=$PATH:/usr/local/go/bin
// go run ./2.go
package main

import (
	"fmt"
	"strings"
	"os"
	"iter"
);


func main() {
	exNumber := 2
	fileName := fmt.Sprintf("./%dinput.txt", exNumber)
	fi, err := os.ReadFile(fileName)
	if err != nil {
		panic(err)
	}
	
    fmt.Println(ex2(strings.Lines(string(fi))))
}

// The ranges are separated by commas (,); each range gives its first ID and last ID separated by a dash (-).
func ex2(lines iter.Seq[string]) int {
	total:=0

	for line := range lines {
    	fmt.Printf(line)
	}
	return total

}
