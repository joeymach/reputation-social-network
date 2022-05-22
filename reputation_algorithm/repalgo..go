package trustGraph

import (
	"errors"
)

type Group struct {
	trustGrid    map[int]map[int]float32
	initialTrust map[int]float32
	Certainty    float32
	Max          int
	Alpha        float32
}

func NewGroup() Group {
	return Group{
		trustGrid:    map[int]map[int]float32{},
		initialTrust: map[int]float32{},
		Certainty:    0.001,
		Max:          200,
		Alpha:        0.95,
	}
}

func (g Group) Add(truster, trusted int, amount float32) (err error) {
	err = float32InRange(amount)
	if err == nil {
		a, ok := g.trustGrid[truster]
		if !ok {
			a = map[int]float32{}
			g.trustGrid[truster] = a
		}
		a[trusted] = amount
	}
	return
}

func (g Group) InitialTrust(trusted int, amount float32) (err error) {
	err = float32InRange(amount)
	if err == nil {
		g.initialTrust[trusted] = amount
	}
	return
}

func float32InRange(x float32) error {
	if x < 0 {
		return errors.New("Trust amount cannot be less than 0")
	}
	if x > 1 {
		return errors.New("Trust amount cannot be greater than 1")
	}
	return nil
}

func (g Group) Compute() map[int]float32 {
	if len(g.initialTrust) == 0 {
		return map[int]float32{}
	}
	t0 := g.initialTrust

	for i := 0; i < g.Max; i++ {
		t1 := *g.computeIteration(&t0)
		d := avgD(&t0, &t1)
		t0 = t1
		if d < g.Certainty {
			break
		}
	}

	return t0
}

func (g Group) computeIteration(t0 *map[int]float32) *map[int]float32 {

	t1 := map[int]float32{}
	for truster, directTrust := range *t0 {
		for trusted, indirectTrust := range g.trustGrid[truster] {
			if trusted != truster {
				t1[trusted] += directTrust * indirectTrust
			}
		}
	}

	highestTrust := float32(0)
	for _, v := range t1 {
		if v > highestTrust {
			highestTrust = v
		}
	}
	for i, v := range t1 {
		t1[i] = (v/highestTrust)*g.Alpha + (1-g.Alpha)*g.initialTrust[i]
	}

	return &t1
}

func abs(x float32) float32 {
	if x < 0 {
		return -x
	}
	return x
}

func avgD(t0, t1 *map[int]float32) float32 {
	d := float32(0)
	for i, v := range *t1 {
		d += abs(v - (*t0)[i])
	}
	d = d / float32(len(*t0))
	return d
}
