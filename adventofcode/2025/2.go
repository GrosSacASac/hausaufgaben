// export PATH=$PATH:/usr/local/go/bin
// go run ./2.go
package main

import (
	"fmt"
	"strings"
	"os"
	"iter"
	"strconv"
);


func main() {
	exNumber := 2
	fileName := fmt.Sprintf("./%dbinput.txt", exNumber)
	fi, err := os.ReadFile(fileName)
	if err != nil {
		panic(err)
	}
    // fmt.Println(ex2(strings.Lines(string(fi))))
    fmt.Println(ex2b(strings.Lines(string(fi))))
}

// The ranges are separated by commas (,); each range gives its first ID and last ID separated by a dash (-).
func ex2(lines iter.Seq[string]) int64 {
	var total int64 = 0 

	for line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
    	// fmt.Printf(line)
    	

		for _, range_ := range strings.Split(line, ",") {

			range_ = strings.TrimSpace(range_)
			first, last, ok := strings.Cut(range_, "-")
			if !ok {
				panic(fmt.Errorf("invalid range %q", range_))
			}
			first_int, _ := strconv.ParseInt(first, 10, 64)
			last_int, _ := strconv.ParseInt(last, 10, 64)
			// identify every number between first and last that is has a pattern of a pair of number ex 22, 1212
			for i := first_int; i <= last_int; i += 1 {
				// convert i to string
				iString := strconv.FormatInt(i, 10)
				// split into two (to identify a pair)
				length := len(iString)
				if (length %2 != 0) {
					continue
				}
				half := length / 2;
				firstPotentialPair, secondPotentialPair := iString[:half], iString[half:]
				if (firstPotentialPair == secondPotentialPair) {
					// every id that is made of pair of numbers needs to be added to the total
					total += i
				}
			
			}
		}
	}
	return total

}

// part b
func ex2b(lines iter.Seq[string]) int64 {
	var total int64 = 0 

	for line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
    	// fmt.Printf(line)
    	

		for _, range_ := range strings.Split(line, ",") {

			range_ = strings.TrimSpace(range_)
			first, last, ok := strings.Cut(range_, "-")
			if !ok {
				panic(fmt.Errorf("invalid range %q", range_))
			}
			first_int, _ := strconv.ParseInt(first, 10, 64)
			last_int, _ := strconv.ParseInt(last, 10, 64)
			// identify every number between first and last that is a repeating block of numbers
			nextNumberInRange: for i := first_int; i <= last_int; i += 1 {
				// convert i to string
				iString := strconv.FormatInt(i, 10)
				// split into two (to identify a pair)
				length := len(iString)
				half := length / 2;
				for blockSize := 1; blockSize <= half; blockSize += 1 {
					if (length % blockSize != 0) { // cannot divide into equal blocks
						continue
					}
					numberOfBlocks := length/blockSize
					var blocks = make([]string, numberOfBlocks, numberOfBlocks)

					for j := 0; j < numberOfBlocks; j += 1 {
						blocks[j] = iString[j*blockSize:(j+1)*blockSize]
					}
					allEqual := true
					for _, block := range blocks {
						if (block != blocks[0]) {
							allEqual = false
							break
						}
					}
					if allEqual {
						total += i
						continue nextNumberInRange // avoid counting 222222 multiple times

					}
				}
			}
		}
	}
	return total

}
